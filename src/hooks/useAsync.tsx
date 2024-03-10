import { useCallback, useEffect, useState } from "react"

interface IUseAsync {
  callback: () => Promise<void>
  dependencies?: React.DependencyList
}

/**
 * Custom hook that handles asynchronous operations in a React component.
 * @param {Function} callback - A function that performs an asynchronous operation.
 * @param {Array} dependencies - An optional array of dependencies that triggers the callback function when changed.
 * @returns {Object} - An object containing the loading, error, and value states.
 */
export const useAsync = ({
  callback,
  // dependencies = [],
}: IUseAsync): object => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [value, setValue] = useState<void | undefined>(undefined)

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [callback])

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}
