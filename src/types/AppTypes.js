// @flow

export type LocalStorage = {
  iban: string | null,
  bic_swift: string | null,
  bank_reference: string | null,
  status: string | null
}
export type PoweredByType = {
  logo: any,
  email: string
}
export type Card = {
  title: string,
  body: string,
  list: Array<string>
}
export type WalletDetails = {
  name: string,
  receiveAddress: {
    publicAddress: string
  },
  currencyCode: string,
  fiatCurrencyCode: string,
  currencyIcon: string,
  currencyIconDark: string
}

export type Transaction = {
  closedAt: number,
  createdAt: number,
  id: string,
  customId: string | null,
  source: string,
  dest: string,
  sourceCurrency: string,
  destCurrency: string,
  sourceAmount: number,
  destAmount: number,
  fees: {
      USD: number
  },
  sourceName: string,
  destName: string,
  status: string,
  message: string | null,
  exchangeRate: number,
  blockchainTxId: string | null,
  destNickname: string | null
}
export type Estimate = {
  pricePerBTC: string,
  input: {
    amount: string,
    currency: string,
    minimumAmount: string
  },
  output: {
    amount: string,
    currency: string
  }
}
