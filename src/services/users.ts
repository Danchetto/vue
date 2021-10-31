import axios from 'axios'

import { API_URL } from '../constants/api'

interface IResponse {
  results: Record<string, any>[]
}

export const getUsers = async () => {
  try {
    const result = await axios.get<IResponse>(API_URL, { params: { results: 50 } })

    return result.data.results

  } catch (error) {
    console.error('Failed to fetch users')
    return []
  }
}
