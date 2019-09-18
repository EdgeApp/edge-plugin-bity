// @flow
import BityApiClient from '@bity/api'
import Order from '@bity/models'
import Owner from '@bity/models'
export async function currentFiatDivider() {
  const data = {
    input: {
      currency: 'BTC',
      amount: '1.00000000'
    },
    output: {
      currency: 'EUR'
    }
  }
  const data2 = {
    input: {
      currency: 'EUR',
      amount: '50'
    },
    output: {
      currency: 'BTC'
    }
  }
  /*
  {
  "input": {
    "currency": "BTC",
    "amount": "1.00000000"
  },
  "output": {
    "currency": "EUR"
  }
}
*/
  window.edgeProvider.consoleLog('DATA')
  window.edgeProvider.consoleLog(data2)
  const request = {
    method: 'POST',
    headers: {
      'Host': 'exchange.api.bity.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2)
  }
  // const url = V2_API_URL + 'paymentMethod/:paymentMethodId/attach'
  const url = 'https://exchange.api.bity.com/v2/orders/estimate'
  const result = await window.fetch(url, request)
  const newData = result.json()
  window.edgeProvider.consoleLog('fixed Estimate')
  window.edgeProvider.consoleLog(newData)
  return newData.output.amount
}

export async function apiEstimate(data: Object) {
  const request = {
    method: 'POST',
    headers: {
      'Host': 'exchange.api.bity.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  // const url = V2_API_URL + 'paymentMethod/:paymentMethodId/attach'
  const url = 'https://exchange.api.bity.com/v2/orders/estimate'
  window.edgeProvider.consoleLog(' Fetch Me ', url)
  window.edgeProvider.consoleLog(url)
  window.edgeProvider.consoleLog(data)
  const result = await window.fetch(url, request)
  const newData = result.json()
  return newData
}

export async function apiSendSignedTransaction(url: string, message: string, address: string) {
  const signedTransaction = await window.edgeProvider.signMessage(message, address)
  window.edgeProvider.consoleLog('signed transaction ')
  window.edgeProvider.consoleLog('signed transaction url ' + url)
  window.edgeProvider.consoleLog(signedTransaction)

  const request = {
    method: 'POST',
    headers: {
      'Host': 'exchange.api.bity.com',
      'Content-Type': 'text/plain'
    },
    body: signedTransaction
  }
  const urlUser = 'https://exchange.api.bity.com' + url
  try {
    const response = window.edgeProvider.sendSignature(signedTransaction, urlUser)/*  await window.fetch(urlUser, request ) */
    //window.edgeProvider.sendSignature(signedTransaction, url)
    window.edgeProvider.consoleLog('response')
    window.edgeProvider.consoleLog(response.status)
    return response
  } catch (e) {
    window.edgeProvider.consoleLog(' error ')
    window.edgeProvider.consoleLog(e)
    return 'error'
  }
  // const url = 'https://exchange.api.bity.com/v2/orders'
}
export async function apiOrder(data: Object) {
  const request = {
    method: 'POST',
    headers: {
      'Host': 'exchange.api.bity.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  }
  const url = 'https://exchange.api.bity.com/v2/orders'
  const url2 = 'https://exchange.api.bity.com'

  try {
    const response = await window.edgeProvider.makeRequestWithLocation(request, url, url2)
    return response
  } catch (e) {
    window.edgeProvider.consoleLog(' error ')
    window.edgeProvider.consoleLog(e)
    return 'error'
  }


  /* const bity = new BityApiClient({
    exchangeApiUrl: 'https://exchange.api.bity.com/v2/',
    clientId: 'my-client-id'
  })
  console.log('Constructed') */
  /*
  const order = (new Order())
  .setInput('BTC')
    .do((input) => input.setCryptoAddress('...'))
  .setOutput('CHF', '100.00')
    .do((output) => output.setOwner(new Owner(...)));
    */
  /* const owner = new Owner()
  owner.setName('John Doe')
  bity
  .then((new Order())                                              // 1
    .setInput('BTC')
      .do((input) => input.setCryptoAddress(data.input.crypto_address))
    .setOutput('CHF', '12.00')
    .do((output) => output.setOwner(owner))
    .do((output) => output.setBicSwift(data.output.bic_swift))
    .do((output) => output.setIban(data.output.iban))
    .generateObjectForOrderCreation())
  .then(preparedOrder => bity.fetchEstimateForOrder(preparedOrder) // 2
    .then(estimatedOrder => alert(estimatedOrder.output.amount))
    .then(() => bity.createOrder(preparedOrder)))                  // 3
  .then(bity.fetchOrderWithUrl)                                    // 4 and 5!
  .then(createdOrder => console.log('success ', createdOrder.paymentDetails))
  .catch(error => console.log('FAIL ', error)) */
}
