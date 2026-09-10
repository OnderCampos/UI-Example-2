import { afterEach } from 'vitest'

let cleanup: undefined | (() => void)

try {
  await import('@testing-library/jest-dom')
  const reactTestingLibrary = await import('@testing-library/react')
  cleanup = reactTestingLibrary.cleanup
} catch {
  cleanup = undefined
}

afterEach(() => {
  cleanup?.()
})
