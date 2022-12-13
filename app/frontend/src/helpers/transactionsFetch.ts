import { IFetchMessage, ITransactionData } from '../@types/TransactionsTypes'
import { getToken } from './localStorage'

export const getTransactions = async (
  typeFilter: string | false,
  dateFilter: string | false
): Promise<ITransactionData | void> => {
  try {
    const token = getToken()
    const response = await fetch(`http://localhost:8000/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ typeFilter, dateFilter })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const postTransaction = async (
  username: string,
  value: string
): Promise<IFetchMessage | void> => {
  try {
    const token = getToken()
    const response = await fetch(`http://localhost:8000/transactions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ username, value })
    })
    const { status, statusText } = response

    const { message } = await response.json()

    return { status, message, statusText }
  } catch (error) {
    console.error(error)
  }
}
