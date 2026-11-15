
import axiosInstance from './axiosInstance'

const axiosService = async (httpMethod, url, reqBody = null) => {
  try {
    const response = await axiosInstance({
      method: httpMethod,
      url: url,
      data: reqBody,
    })

    return response.data
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message)
    throw error
  }
}

export default axiosService
