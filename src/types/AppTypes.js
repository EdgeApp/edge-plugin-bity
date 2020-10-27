// @flow

export type LocalStorage = {
  iban: string | null,
  bic_swift: string | null,
  bank_reference: string | null,
  owner: string | null,
  address1: string | null,
  address2: string | null,
  city: string | null,
  country: string | null,
  state: string | null,
  zip: string | null,
  status: string | null,
  orderIds: Array<string>,
  orders: Array<Object>
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
  closedAt: Date | null,
  createdAt: Date,
  id: string,
  type: string,
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
  destNickname: string | null,
  link: string
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

export type OrderDetail = {
  id: string,
  message_to_sign: {
    body: string,
    signature_submission_url: string
  },
  payment_details:{
    crypto_address: string,
    account_number: string,
    bank_address: string,
    bank_code: string,
    iban: string,
    recipient: string,
    reference: string,
    swift_bic: string,
    type: string
  }
}

export type WireInformation = {
  account_number: string,
  bank_address: string,
  bank_code: string,
  iban: string,
  recipient: string,
  reference: string,
  swift_bic: string
}

export type BuyOrder = {
  id: string,
  input: {
    amount: string,
    currency: string,
    iban: string,
    type: string
  },
  output: {
    type: string,
    crypto_address: string,
    currency: string,
    amount: string
  },
  payment_details: WireInformation,
  timestamp_awaiting_payment_since: string,

}

