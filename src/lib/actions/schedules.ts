"use server"

import { db } from '@/lib/db'
import { getAuthenticatedSession } from '@/lib/utils/auth.utils'

export type ListSchedulesParams = {
  countryId: string
  functionalityId?: string
  executionDate?: string
  page: number
  pageSize: number
}

export type ListSchedulesResult<TRecord = unknown> = {
  records: TRecord[]
  totalCount: number
  page: number
  pageSize: number
}

export type CreateSchedulesBulkParams = {
  countryId: string
  functionalityId: string
  executionDates: string[]
}

export type CreateSchedulesBulkResult = {
  status: 'success' | 'partial' | 'duplicate'
  createdCount: number
  duplicateCount: number
  duplicateDates: string[]
}

export type DeactivateSchedulesBulkParams = {
  countryId: string
  scheduleIds: string[]
}

export type DeactivateSchedulesBulkResult = {
  success: boolean
  updatedCount: number
}

type DebugCondition = {
  kind: 'and' | 'eq' | 'isNull' | 'in'
  values?: DebugCondition[]
  column?: string
  value?: string
  list?: string[]
  toString(): string
}

function eqCondition(column: string, value: string): DebugCondition {
  return {
    kind: 'eq',
    column,
    value,
    toString() {
      return `${column} = ${value}`
    },
  }
}

function isNullCondition(column: string): DebugCondition {
  return {
    kind: 'isNull',
    column,
    toString() {
      return `${column} IS NULL`
    },
  }
}

function inCondition(column: string, list: string[]): DebugCondition {
  return {
    kind: 'in',
    column,
    list,
    toString() {
      return `${column} IN (${list.join(', ')})`
    },
  }
}

function andCondition(...values: DebugCondition[]): DebugCondition {
  return {
    kind: 'and',
    values,
    toString() {
      return values.map((value) => value.toString()).join(' AND ')
    },
  }
}

const schedulesTableRef = 'stl_scheduler_risk'

export async function listSchedules(
  params: ListSchedulesParams
): Promise<ListSchedulesResult> {
  const session = await getAuthenticatedSession()

  if (!session?.user?.id) {
    throw new Error('Unauthenticated session')
  }

  if (session.countryId && session.countryId !== params.countryId) {
    throw new Error('Forbidden country access')
  }

  const page = Number.isFinite(params.page) && params.page > 0 ? Math.floor(params.page) : 1
  const pageSize =
    Number.isFinite(params.pageSize) && params.pageSize > 0
      ? Math.floor(params.pageSize)
      : 10
  const offset = (page - 1) * pageSize

  const filters: DebugCondition[] = [
    eqCondition('stl_scheduler_risk.country_id', params.countryId),
    isNullCondition('stl_scheduler_risk.deactivated_at'),
  ]

  if (params.functionalityId) {
    filters.push(
      eqCondition('stl_scheduler_risk.functionality_id', params.functionalityId)
    )
  }

  if (params.executionDate) {
    filters.push(eqCondition('stl_scheduler_risk.execution_date', params.executionDate))
  }

  const whereClause = andCondition(...filters)

  const records = await (db as never)
    .select()
    .from(schedulesTableRef)
    .where(whereClause)
    .limit(pageSize)
    .offset(offset)

  const totalCountRows = await (db as never)
    .select({ count: 'count(*)' })
    .from(schedulesTableRef)
    .where(whereClause)

  const rawCount = totalCountRows?.[0]?.count
  const totalCount = typeof rawCount === 'number' ? rawCount : Number(rawCount ?? 0)

  return {
    records: Array.isArray(records) ? records : [],
    totalCount,
    page,
    pageSize,
  }
}

export async function createSchedulesBulk(
  params: CreateSchedulesBulkParams
): Promise<CreateSchedulesBulkResult> {
  const session = await getAuthenticatedSession()

  if (!session?.user?.id) {
    throw new Error('Unauthenticated session')
  }

  if (session.countryId && session.countryId !== params.countryId) {
    throw new Error('Forbidden country access')
  }

  const duplicateDates: string[] = []
  let createdCount = 0

  for (const executionDate of params.executionDates) {
    const insertedRows = await (db as never)
      .insert(schedulesTableRef)
      .values({
        countryId: session.countryId ?? params.countryId,
        functionalityId: params.functionalityId,
        executionDate,
        createdBy: session.user.id,
        createdAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .returning()

    if (Array.isArray(insertedRows) && insertedRows.length > 0) {
      createdCount += 1
    } else {
      duplicateDates.push(executionDate)
    }
  }

  const duplicateCount = duplicateDates.length

  if (createdCount === params.executionDates.length) {
    return {
      status: 'success',
      createdCount,
      duplicateCount,
      duplicateDates,
    }
  }

  if (createdCount > 0) {
    return {
      status: 'partial',
      createdCount,
      duplicateCount,
      duplicateDates,
    }
  }

  return {
    status: 'duplicate',
    createdCount,
    duplicateCount,
    duplicateDates,
  }
}

export async function deactivateSchedulesBulk(
  params: DeactivateSchedulesBulkParams
): Promise<DeactivateSchedulesBulkResult> {
  const session = await getAuthenticatedSession()

  if (!session?.user?.id) {
    throw new Error('Unauthenticated session')
  }

  if (session.countryId && session.countryId !== params.countryId) {
    throw new Error('Forbidden country access')
  }

  if (params.scheduleIds.length === 0) {
    return {
      success: true,
      updatedCount: 0,
    }
  }

  const scope = andCondition(
    eqCondition('stl_scheduler_risk.country_id', session.countryId ?? params.countryId),
    inCondition('stl_scheduler_risk.id', params.scheduleIds)
  )

  const updatedRows = await (db as never).transaction(async (tx: never) => {
    const rows = await (tx as never)
      .update(schedulesTableRef)
      .set({
        isActive: false,
        updatedBy: session.user.id,
        updatedAt: new Date().toISOString(),
      })
      .where(scope)

    if (!Array.isArray(rows) || rows.length !== params.scheduleIds.length) {
      throw new Error('Not all requested schedules could be deactivated; transaction rolled back')
    }

    return rows
  })

  return {
    success: true,
    updatedCount: Array.isArray(updatedRows) ? updatedRows.length : 0,
  }
}
