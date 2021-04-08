import { renderHook, act } from '@testing-library/react-hooks'
import { useDebounce } from './useDebounce'

jest.useFakeTimers()

describe('useDebounce', () => {
  it('immediately returns initial value', () => {
    const { result } = renderHook(() => useDebounce('initial-value'))

    expect(result.current).toBe('initial-value')
  })

  it('will update the value after the timer has been called', () => {
    const { result, rerender } = renderHook(value => useDebounce(value), {
      initialProps: 'initial-value',
    })

    // Check initial value
    expect(result.current).toBe('initial-value')

    rerender('new-value')

    // Timer shouldn't have been called yet.
    expect(result.current).toBe('initial-value')

    act(() => {
      jest.runAllTimers()
    })

    // After timers the new value should be set.
    expect(result.current).toBe('new-value')
  })

  it('should return the latest value', () => {
    const { result, rerender } = renderHook(value => useDebounce(value), {
      initialProps: 'initial-value',
    })

    // Check initial value
    expect(result.current).toBe('initial-value')

    rerender('second-value')
    rerender('final-value')

    // Timer shouldn't have been called yet.
    expect(result.current).toBe('initial-value')

    act(() => {
      jest.runAllTimers()
    })

    // After timers the new value should be set to the final value.
    expect(result.current).toBe('final-value')
  })
})
