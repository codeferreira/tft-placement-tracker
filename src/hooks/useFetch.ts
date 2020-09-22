/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import useSWR from 'swr'
import api from '../services/api'

export function useFetch<Data = unknown, Error = unknown>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async endpoint => {
      const response = await api.get(endpoint)

      return response.data
    },
    {}
  )

  return { data, error, mutate }
}
