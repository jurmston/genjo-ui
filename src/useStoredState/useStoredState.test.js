import { renderHook, act } from '@testing-library/react-hooks'
import useStoredState from './useStoredState'

// Clear mocked localStorage before each new test.
beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('useStoredState', () => {
  it('should throw an error when there is no prefix', () => {
    const { result } = renderHook(value => useStoredState(value), {
      initialProps: {},
    })

    expect(result.error).toBeTruthy()
  })

  it('should store and update a value in session storage', () => {
    const { result } = renderHook(value => useStoredState(value), {
      initialProps: {
        key: 'test',
        initialValue: 'test1',
      }
    })

    // Check the initial state and storage matches the initial value.
    expect(result.current[0]).toBe('test1')
    expect(sessionStorage.getItem('test')).toBe('test1')

    act(() => {
      result.current[1]('test2')
    })

    expect(result.current[0]).toBe('test2')
    expect(sessionStorage.getItem('test')).toBe('test2')
  })

  it('should store and update a value in local storage', () => {
    const { result } = renderHook(value => useStoredState(value), {
      initialProps: {
        key: 'test',
        initialValue: 'test1',
        storage: localStorage,
      }
    })

    // Check the initial state and storage matches the initial value.
    expect(result.current[0]).toBe('test1')
    expect(localStorage.getItem('test')).toBe('test1')

    act(() => {
      result.current[1]('test2')
    })

    expect(result.current[0]).toBe('test2')
    expect(localStorage.getItem('test')).toBe('test2')
  })

  it('should use an existing value if it is in storage', () => {
    sessionStorage.setItem('test', 'existing-value')

    const { result } = renderHook(value => useStoredState(value), {
      initialProps: {
        key: 'test',
        initialValue: 'new-value',
      }
    })

    expect(result.current[0]).toBe('existing-value')
    expect(sessionStorage.getItem('test')).toBe('existing-value')
  })

  it('should serialize and deserialize non-string values', () => {
    const { result } = renderHook(value => useStoredState(value), {
      initialProps: {
        key: 'test',
        initialValue: {a: 1},
        fromStorage: x => JSON.parse(x),
        toStorage: x => JSON.stringify(x),
      },
    })

    expect(result.current[0]).toEqual({a: 1})
    expect(sessionStorage.getItem('test')).toBe('{"a":1}')

    act(() => {
      result.current[1]({b: 2})
    })

    expect(result.current[0]).toEqual({b: 2})
    expect(sessionStorage.getItem('test')).toBe('{"b":2}')
  })

  it('should remove the key from storage if the value is null or undefined', () => {
    const { result } = renderHook(value => useStoredState(value), {
      initialProps: {
        key: 'test',
      },
    })

    expect(result.current[0]).toBeNull()
    expect(sessionStorage.getItem('test')).toBeNull()

    act(() => {
      result.current[1](undefined)
    })

    expect(result.current[0]).toBeNull()
    expect(sessionStorage.getItem('test')).toBeNull()
  })
})
