import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
  transaction: vi.fn(),
  update: vi.fn(),
}

const mockGetAuthenticatedSession = vi.fn()

vi.mock('@/lib/db', () => ({
  db: mockDb,
}))

vi.mock('@/lib/utils/auth.utils', async () => {
  const actual = await vi.importActual<typeof import('@/lib/utils/auth.utils')>(
    '@/lib/utils/auth.utils'
  )

  return {
    ...actual,
    getAuthenticatedSession: mockGetAuthenticatedSession,
  }
})

describe('subtask-4-1 schedule listing server action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('UT-subtask-4-1-US-1-AC-14 rejects unauthenticated requests before querying the database', async () => {
    mockGetAuthenticatedSession.mockResolvedValue(null)

    const { listSchedules } = await import('../schedules')

    await expect(
      listSchedules({
        countryId: 'country-1',
        page: 1,
        pageSize: 10,
      })
    ).rejects.toThrow(/auth|session|unauthenticated/i)

    expect(mockDb.select).not.toHaveBeenCalled()
  })

  it('UT-subtask-4-1-US-1-AC-6-AC-8-AC-10 returns active schedules scoped to the authenticated country with pagination metadata', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const records = [
      {
        id: 'schedule-1',
        countryId: 'country-1',
        functionalityId: 'func-1',
        executionDate: '2025-01-01',
        createdAt: '2024-12-01T10:00:00.000Z',
        createdBy: 'user-1',
        deactivatedAt: null,
      },
    ]

    const countRows = [{ count: 1 }]
    const recordQuery = createRecordQueryMock(records)
    const countQuery = createCountQueryMock(countRows)

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    const result = await listSchedules({
      countryId: 'country-1',
      page: 1,
      pageSize: 10,
    })

    expect(result).toEqual({
      records,
      totalCount: 1,
      page: 1,
      pageSize: 10,
    })

    expect(recordQuery.from).toHaveBeenCalledOnce()
    expect(recordQuery.where).toHaveBeenCalledOnce()
    expect(recordQuery.limit).toHaveBeenCalledWith(10)
    expect(recordQuery.offset).toHaveBeenCalledWith(0)
    expect(countQuery.from).toHaveBeenCalledOnce()
    expect(countQuery.where).toHaveBeenCalledOnce()

    const recordsWhereArg = recordQuery.where.mock.calls[0]?.[0]
    const countWhereArg = countQuery.where.mock.calls[0]?.[0]

    expect(String(recordsWhereArg)).toContain('country-1')
    expect(String(recordsWhereArg).toLowerCase()).toContain('deactivated')
    expect(String(countWhereArg)).toContain('country-1')
    expect(String(countWhereArg).toLowerCase()).toContain('deactivated')
  })

  it('UT-subtask-4-1-US-1-AC-4 applies the functionality filter without requiring an execution date', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const recordQuery = createRecordQueryMock([])
    const countQuery = createCountQueryMock([{ count: 0 }])

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    await listSchedules({
      countryId: 'country-1',
      functionalityId: 'func-9',
      page: 1,
      pageSize: 20,
    })

    const whereArg = recordQuery.where.mock.calls[0]?.[0]

    expect(String(whereArg)).toContain('country-1')
    expect(String(whereArg)).toContain('func-9')
    expect(String(whereArg)).not.toContain('2025-')
  })

  it('UT-subtask-4-1-US-1-AC-5 applies both functionality and exact execution date filters', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const recordQuery = createRecordQueryMock([])
    const countQuery = createCountQueryMock([{ count: 0 }])

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    await listSchedules({
      countryId: 'country-1',
      functionalityId: 'func-9',
      executionDate: '2025-03-15',
      page: 1,
      pageSize: 20,
    })

    const whereArg = recordQuery.where.mock.calls[0]?.[0]

    expect(String(whereArg)).toContain('country-1')
    expect(String(whereArg)).toContain('func-9')
    expect(String(whereArg)).toContain('2025-03-15')
  })

  it('UT-subtask-4-1-US-1-AC-10-AC-11-AC-12 calculates offset from page and pageSize and returns total count', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const recordQuery = createRecordQueryMock([{ id: 'schedule-21' }])
    const countQuery = createCountQueryMock([{ count: 55 }])

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    const result = await listSchedules({
      countryId: 'country-1',
      page: 3,
      pageSize: 10,
    })

    expect(recordQuery.limit).toHaveBeenCalledWith(10)
    expect(recordQuery.offset).toHaveBeenCalledWith(20)
    expect(result.totalCount).toBe(55)
    expect(result.page).toBe(3)
    expect(result.pageSize).toBe(10)
  })

  it('UT-subtask-4-1-US-1-AC-9 returns an empty page when no records match the supplied filters', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const recordQuery = createRecordQueryMock([])
    const countQuery = createCountQueryMock([{ count: 0 }])

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    const result = await listSchedules({
      countryId: 'country-1',
      functionalityId: 'func-missing',
      executionDate: '2025-04-02',
      page: 1,
      pageSize: 10,
    })

    expect(result).toEqual({
      records: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
    })
  })

  it('UT-subtask-4-1-US-1-AC-6-AC-15 keeps enforcing the country filter at the query boundary', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const leakedRecord = {
      id: 'schedule-foreign',
      countryId: 'country-2',
    }

    const recordQuery = createRecordQueryMock([leakedRecord])
    const countQuery = createCountQueryMock([{ count: 1 }])

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    await listSchedules({
      countryId: 'country-1',
      page: 1,
      pageSize: 10,
    })

    const recordsWhereArg = recordQuery.where.mock.calls[0]?.[0]
    const countWhereArg = countQuery.where.mock.calls[0]?.[0]

    expect(String(recordsWhereArg)).toContain('country-1')
    expect(String(recordsWhereArg)).not.toContain('country-2')
    expect(String(countWhereArg)).toContain('country-1')
    expect(String(countWhereArg)).not.toContain('country-2')
  })

  it('UT-subtask-4-1-US-1-AC-14-AC-15 rejects requests whose client country differs from the authenticated session country', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const { listSchedules } = await import('../schedules')

    await expect(
      listSchedules({
        countryId: 'country-2',
        page: 1,
        pageSize: 10,
      })
    ).rejects.toThrow(/country|unauthorized|forbidden/i)

    expect(mockDb.select).not.toHaveBeenCalled()
  })

  it('UT-subtask-4-1-US-1-AC-8-AC-10 excludes deactivated schedules from both the list and the count by default', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-1' },
      countryId: 'country-1',
    })

    const recordQuery = createRecordQueryMock([
      {
        id: 'schedule-active',
        deactivatedAt: null,
      },
    ])
    const countQuery = createCountQueryMock([{ count: 1 }])

    mockDb.select.mockReturnValueOnce(recordQuery).mockReturnValueOnce(countQuery)

    const { listSchedules } = await import('../schedules')
    const result = await listSchedules({
      countryId: 'country-1',
      page: 1,
      pageSize: 10,
    })

    const recordsWhereArg = recordQuery.where.mock.calls[0]?.[0]
    const countWhereArg = countQuery.where.mock.calls[0]?.[0]

    expect(String(recordsWhereArg).toLowerCase()).toContain('deactivated')
    expect(String(countWhereArg).toLowerCase()).toContain('deactivated')
    expect(result.records).toEqual([
      {
        id: 'schedule-active',
        deactivatedAt: null,
      },
    ])
    expect(result.totalCount).toBe(1)
  })
})

describe('subtask-4-2 bulk schedule creation server action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('UT-subtask-4-2-US-3-AC-29 rejects unauthenticated bulk create requests before attempting inserts', async () => {
    mockGetAuthenticatedSession.mockResolvedValue(null)

    const { createSchedulesBulk } = await import('../schedules')

    expect(typeof createSchedulesBulk).toBe('function')

    if (typeof createSchedulesBulk !== 'function') {
      throw new Error('createSchedulesBulk is not implemented')
    }

    await expect(
      createSchedulesBulk({
        countryId: 'country-1',
        functionalityId: 'func-1',
        executionDates: ['2025-05-01'],
      })
    ).rejects.toThrow(/auth|session|unauthenticated/i)

    expect(mockDb.insert).not.toHaveBeenCalled()
  })

  it('UT-subtask-4-2-US-3-AC-30 rejects requests that attempt cross-country creation', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-77' },
      countryId: 'country-session',
    })

    const { createSchedulesBulk } = await import('../schedules')

    expect(typeof createSchedulesBulk).toBe('function')

    if (typeof createSchedulesBulk !== 'function') {
      throw new Error('createSchedulesBulk is not implemented')
    }

    await expect(
      createSchedulesBulk({
        countryId: 'country-client',
        functionalityId: 'func-1',
        executionDates: ['2025-05-01'],
      })
    ).rejects.toThrow(/country|forbidden|unauthorized/i)

    expect(mockDb.insert).not.toHaveBeenCalled()
  })

  it('UT-subtask-4-2-US-3-AC-19-AC-20-AC-23 creates one record per submitted date and returns a full success classification', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-123' },
      countryId: 'country-1',
    })

    const executionDates = ['2025-05-01', '2025-05-02', '2025-05-03']
    const insertCalls = createBulkInsertSequence([1, 1, 1])

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)
    const result = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-9',
      executionDates,
    })

    expect(mockDb.insert).toHaveBeenCalledTimes(3)
    expect(insertCalls).toHaveLength(3)

    expect(insertCalls.map((call) => call.executionDate)).toEqual(executionDates)
    expect(insertCalls.map((call) => call.countryId)).toEqual([
      'country-1',
      'country-1',
      'country-1',
    ])
    expect(insertCalls.map((call) => call.functionalityId)).toEqual([
      'func-9',
      'func-9',
      'func-9',
    ])
    expect(insertCalls.map((call) => call.createdBy)).toEqual([
      'user-123',
      'user-123',
      'user-123',
    ])
    expect(insertCalls.every((call) => 'createdAt' in call)).toBe(true)

    expectBulkCreateResult(result, {
      status: 'success',
      createdCount: 3,
      duplicateCount: 0,
      duplicateDates: [],
    })
  })

  it('UT-subtask-4-2-US-3-AC-21-AC-22-AC-24-AC-31 persists non-duplicates and reports duplicates when conflict-ignore insertions return no rows', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-123' },
      countryId: 'country-1',
    })

    const executionDates = ['2025-06-01', '2025-06-02', '2025-06-03']
    createBulkInsertSequence([1, 0, 1])

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)
    const result = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-9',
      executionDates,
    })

    expect(mockDb.insert).toHaveBeenCalledTimes(3)
    expectBulkCreateResult(result, {
      status: 'partial',
      createdCount: 2,
      duplicateCount: 1,
      duplicateDates: ['2025-06-02'],
    })
  })

  it('UT-subtask-4-2-US-3-AC-21-AC-25-AC-31 returns a full failure classification when all submitted dates already exist', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-123' },
      countryId: 'country-1',
    })

    const executionDates = ['2025-07-01', '2025-07-02']
    createBulkInsertSequence([0, 0])

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)
    const result = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-3',
      executionDates,
    })

    expect(mockDb.insert).toHaveBeenCalledTimes(2)
    expectBulkCreateResult(result, {
      status: 'duplicate',
      createdCount: 0,
      duplicateCount: 2,
      duplicateDates: executionDates,
    })
  })

  it('UT-subtask-4-2-US-3-AC-22 evaluates each submitted date independently so duplicates do not block valid inserts in the same request', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-45' },
      countryId: 'country-1',
    })

    const insertCalls = createBulkInsertSequence([0, 1, 1])

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)
    const result = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-4',
      executionDates: ['2025-08-10', '2025-08-11', '2025-08-12'],
    })

    expect(insertCalls).toHaveLength(3)
    expect(insertCalls.map((call) => call.executionDate)).toEqual([
      '2025-08-10',
      '2025-08-11',
      '2025-08-12',
    ])
    expectBulkCreateResult(result, {
      status: 'partial',
      createdCount: 2,
      duplicateCount: 1,
      duplicateDates: ['2025-08-10'],
    })
  })

  it('UT-subtask-4-2-US-3-AC-20 derives insert payload fields server-side using the authenticated user for every created schedule', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'server-user' },
      countryId: 'country-9',
    })

    const insertCalls = createBulkInsertSequence([1, 1])

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)
    await createSchedulesBulk({
      countryId: 'country-9',
      functionalityId: 'func-audit',
      executionDates: ['2025-09-01', '2025-09-02'],
    })

    expect(insertCalls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          countryId: 'country-9',
          functionalityId: 'func-audit',
          executionDate: '2025-09-01',
          createdBy: 'server-user',
          createdAt: expect.anything(),
        }),
        expect.objectContaining({
          countryId: 'country-9',
          functionalityId: 'func-audit',
          executionDate: '2025-09-02',
          createdBy: 'server-user',
          createdAt: expect.anything(),
        }),
      ])
    )
  })

  it('UT-subtask-4-2-US-3-AC-23-AC-24-AC-25 returns structured result variants for full success, partial success, and full failure', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-123' },
      countryId: 'country-1',
    })

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)

    createBulkInsertSequence([1, 1])
    const successResult = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-1',
      executionDates: ['2025-10-01', '2025-10-02'],
    })

    createBulkInsertSequence([1, 0])
    const partialResult = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-1',
      executionDates: ['2025-10-03', '2025-10-04'],
    })

    createBulkInsertSequence([0, 0])
    const duplicateResult = await createSchedulesBulk({
      countryId: 'country-1',
      functionalityId: 'func-1',
      executionDates: ['2025-10-05', '2025-10-06'],
    })

    expectBulkCreateResult(successResult, {
      status: 'success',
      createdCount: 2,
      duplicateCount: 0,
      duplicateDates: [],
    })
    expectBulkCreateResult(partialResult, {
      status: 'partial',
      createdCount: 1,
      duplicateCount: 1,
      duplicateDates: ['2025-10-04'],
    })
    expectBulkCreateResult(duplicateResult, {
      status: 'duplicate',
      createdCount: 0,
      duplicateCount: 2,
      duplicateDates: ['2025-10-05', '2025-10-06'],
    })
  })

  it('UT-subtask-4-2-US-3-AC-32 surfaces database failures clearly and never returns a misleading success classification', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-123' },
      countryId: 'country-1',
    })

    const insertBuilder = createInsertBuilder(new Error('database unavailable'))
    mockDb.insert.mockReturnValue(insertBuilder)

    const schedulesModule = await import('../schedules')
    const createSchedulesBulk = getCreateSchedulesBulk(schedulesModule)

    await expect(
      createSchedulesBulk({
        countryId: 'country-1',
        functionalityId: 'func-1',
        executionDates: ['2025-11-01'],
      })
    ).rejects.toThrow(/database unavailable/i)
  })
})

describe('subtask-4-3 bulk schedule deactivation server action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('UT-subtask-4-3-US-4-AC-20 rejects unauthenticated bulk deactivation requests before any database transaction starts', async () => {
    mockGetAuthenticatedSession.mockResolvedValue(null)

    const schedulesModule = await import('../schedules')
    const deactivateSchedulesBulk = getDeactivateSchedulesBulk(schedulesModule)

    await expect(
      deactivateSchedulesBulk({
        countryId: 'country-1',
        scheduleIds: ['schedule-1', 'schedule-2'],
      })
    ).rejects.toThrow(/auth|session|unauthenticated/i)

    expect(mockDb.transaction).not.toHaveBeenCalled()
    expect(mockDb.update).not.toHaveBeenCalled()
  })

  it('UT-subtask-4-3-US-4-AC-21 rejects requests whose client country differs from authenticated session country', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'user-9' },
      countryId: 'country-session',
    })

    const schedulesModule = await import('../schedules')
    const deactivateSchedulesBulk = getDeactivateSchedulesBulk(schedulesModule)

    await expect(
      deactivateSchedulesBulk({
        countryId: 'country-client',
        scheduleIds: ['schedule-1'],
      })
    ).rejects.toThrow(/country|forbidden|unauthorized/i)

    expect(mockDb.transaction).not.toHaveBeenCalled()
    expect(mockDb.update).not.toHaveBeenCalled()
  })

  it('UT-subtask-4-3-US-4-AC-11-AC-12-AC-17 deactivates all selected schedules in a single transaction using authenticated user audit fields', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'audit-user' },
      countryId: 'country-1',
    })

    const transactionContext = createTransactionContext({ updatedRows: 3 })
    mockDb.transaction.mockImplementation(async (callback: TransactionCallback) =>
      callback(transactionContext)
    )

    const schedulesModule = await import('../schedules')
    const deactivateSchedulesBulk = getDeactivateSchedulesBulk(schedulesModule)
    const result = await deactivateSchedulesBulk({
      countryId: 'country-1',
      scheduleIds: ['schedule-1', 'schedule-2', 'schedule-3'],
    })

    expect(mockDb.transaction).toHaveBeenCalledTimes(1)
    expect(transactionContext.update).toHaveBeenCalledTimes(1)
    expect(transactionContext.builder.set).toHaveBeenCalledTimes(1)
    expect(transactionContext.builder.where).toHaveBeenCalledTimes(1)
    expect(result).toEqual(
      expect.objectContaining({
        success: true,
        updatedCount: 3,
      })
    )

    const setArg = transactionContext.builder.set.mock.calls[0]?.[0] as Record<
      string,
      unknown
    >
    expect(setArg).toEqual(
      expect.objectContaining({
        isActive: false,
        updatedBy: 'audit-user',
        updatedAt: expect.anything(),
      })
    )

    const whereArg = transactionContext.builder.where.mock.calls[0]?.[0]
    const whereText = String(whereArg)
    expect(whereText).toContain('country-1')
    expect(whereText).toContain('schedule-1')
    expect(whereText).toContain('schedule-2')
    expect(whereText).toContain('schedule-3')
  })

  it('UT-subtask-4-3-US-4-AC-17-AC-18-AC-22 surfaces transaction failure as an error/failure result and does not report success', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'audit-user' },
      countryId: 'country-1',
    })

    mockDb.transaction.mockRejectedValue(new Error('transaction failed'))

    const schedulesModule = await import('../schedules')
    const deactivateSchedulesBulk = getDeactivateSchedulesBulk(schedulesModule)

    await expect(
      deactivateSchedulesBulk({
        countryId: 'country-1',
        scheduleIds: ['schedule-1', 'schedule-2'],
      })
    ).rejects.toThrow(/transaction failed/i)
  })

  it('UT-subtask-4-3-US-4-AC-17-AC-21 fails the operation when not all requested IDs can be deactivated under the specified country scope', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'audit-user' },
      countryId: 'country-1',
    })

    const transactionContext = createTransactionContext({ updatedRows: 1 })
    mockDb.transaction.mockImplementation(async (callback: TransactionCallback) =>
      callback(transactionContext)
    )

    const schedulesModule = await import('../schedules')
    const deactivateSchedulesBulk = getDeactivateSchedulesBulk(schedulesModule)

    await expect(
      deactivateSchedulesBulk({
        countryId: 'country-1',
        scheduleIds: ['schedule-1', 'schedule-2'],
      })
    ).rejects.toThrow(/all|requested|transaction|rollback|country/i)
  })

  it('UT-subtask-4-3-US-4-AC-12 derives audit metadata server-side for every affected record', async () => {
    mockGetAuthenticatedSession.mockResolvedValue({
      user: { id: 'server-user-77' },
      countryId: 'country-9',
    })

    const transactionContext = createTransactionContext({ updatedRows: 2 })
    mockDb.transaction.mockImplementation(async (callback: TransactionCallback) =>
      callback(transactionContext)
    )

    const schedulesModule = await import('../schedules')
    const deactivateSchedulesBulk = getDeactivateSchedulesBulk(schedulesModule)
    await deactivateSchedulesBulk({
      countryId: 'country-9',
      scheduleIds: ['schedule-a', 'schedule-b'],
    })

    const setArg = transactionContext.builder.set.mock.calls[0]?.[0] as Record<
      string,
      unknown
    >

    expect(setArg.updatedBy).toBe('server-user-77')
    expect(setArg.updatedAt).toBeTruthy()
    expect(String(setArg.updatedAt)).toMatch(/.+/)
  })
})

function createRecordQueryMock(records: unknown[]) {
  const from = vi.fn()
  const where = vi.fn()
  const limit = vi.fn()
  const offset = vi.fn()

  const query = { from, where, limit, offset }

  from.mockReturnValue(query)
  where.mockReturnValue(query)
  limit.mockReturnValue(query)
  offset.mockResolvedValue(records)

  return query
}

function createCountQueryMock(result: unknown[]) {
  const from = vi.fn()
  const where = vi.fn()

  const query = { from, where }

  from.mockReturnValue(query)
  where.mockResolvedValue(result)

  return query
}

type InsertShape = {
  countryId?: string
  functionalityId?: string
  executionDate?: string
  createdBy?: string
  createdAt?: unknown
}

type CreateSchedulesBulkModule = typeof import('../schedules') & {
  createSchedulesBulk?: (params: {
    countryId: string
    functionalityId: string
    executionDates: string[]
  }) => Promise<unknown>
}

type DeactivateSchedulesBulkModule = typeof import('../schedules') & {
  deactivateSchedulesBulk?: (params: {
    countryId: string
    scheduleIds: string[]
  }) => Promise<unknown>
}

type MockFn = ReturnType<typeof vi.fn>

type TransactionBuilder = {
  set: MockFn
  where: MockFn
}

type TransactionContext = {
  update: MockFn
  builder: TransactionBuilder
}

type TransactionCallback = (tx: TransactionContext) => Promise<unknown> | unknown

function getCreateSchedulesBulk(module: CreateSchedulesBulkModule) {
  expect(typeof module.createSchedulesBulk).toBe('function')

  if (typeof module.createSchedulesBulk !== 'function') {
    throw new Error('createSchedulesBulk is not implemented')
  }

  return module.createSchedulesBulk
}

function getDeactivateSchedulesBulk(module: DeactivateSchedulesBulkModule) {
  expect(typeof module.deactivateSchedulesBulk).toBe('function')

  if (typeof module.deactivateSchedulesBulk !== 'function') {
    throw new Error('deactivateSchedulesBulk is not implemented')
  }

  return module.deactivateSchedulesBulk
}

function createBulkInsertSequence(createdRowCounts: number[]) {
  const insertCalls: InsertShape[] = []

  for (const count of createdRowCounts) {
    mockDb.insert.mockReturnValueOnce(createInsertBuilder(count, insertCalls))
  }

  return insertCalls
}

function createInsertBuilder(
  result: number | Error,
  insertCalls: InsertShape[] = []
) {
  const builder = {
    values: vi.fn((payload: InsertShape) => {
      insertCalls.push(payload)
      return builder
    }),
    onConflictDoNothing: vi.fn(() => builder),
    returning: vi.fn(async () => {
      if (result instanceof Error) {
        throw result
      }

      return Array.from({ length: result }, (_, index) => ({ id: `created-${index}` }))
    }),
  }

  return builder
}

function createTransactionContext({ updatedRows }: { updatedRows: number }): TransactionContext {
  const set = vi.fn()
  const where = vi.fn()
  const builder: TransactionBuilder = {
    set,
    where,
  }

  const update = vi.fn(() => builder)

  set.mockReturnValue(builder)
  where.mockImplementation(async () => {
    return Array.from({ length: updatedRows }, (_, index) => ({ id: `updated-${index}` }))
  })

  return {
    update,
    builder,
  }
}

function expectBulkCreateResult(
  result: unknown,
  expected: {
    status: string
    createdCount: number
    duplicateCount: number
    duplicateDates: string[]
  }
) {
  expect(result).toEqual(
    expect.objectContaining({
      status: expected.status,
      createdCount: expected.createdCount,
      duplicateCount: expected.duplicateCount,
      duplicateDates: expected.duplicateDates,
    })
  )
}
