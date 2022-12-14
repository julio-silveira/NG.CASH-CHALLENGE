export interface ITransactionData {
  id: number
  debitedusername: string
  creditedusername: string
  value: string
  created_at: string
}

export interface ITaskState {
  status: boolean
  description: string
}

export interface IFetchMessage {
  message: string | undefined
  status: number | undefined
  statusText: string | undefined
}

export interface IFetchFilteredOutput {
  status: number | undefined
  data: ITransactionData[]
}

export interface ITransactionFilters {
  accountId: number
  typeFilter: false | 'credit' | 'debit'
  startingDate?: string
  endingDate?: string
}
