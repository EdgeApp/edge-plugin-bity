// @flow

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
  const url = 'https://exchange.api.bity.com/v2/orders/estimate'
  window.edgeProvider.consoleLog(' Fetch Me ', url)
  window.edgeProvider.consoleLog(url)
  window.edgeProvider.consoleLog(data)
  const result = await window.fetch(url, request)
  if(result.status === 200) {
    const newData = result.json()
    return newData
  }
  throw new Error('Unable to process request at this time: code 35')
}

export async function apiSendSignedTransaction(url: string, message: string, address: string) {
  const signedTransaction = await window.edgeProvider.signMessage(message, address)
  const request = {
    method: 'POST',
    headers: {
      Host: 'exchange.api.bity.com',
      'Content-Type': '*/*'
    },
    body: signedTransaction
  }
  const url2 = 'https://exchange.api.bity.com' + url
  const response = await window.fetch(url2, request)
  if (response.status === 400) {
    window.edgeProvider.consoleLog('BAD BAD BAD ')
    throw new Error(['Could not complete transaction. Code: 470'])
  }
  if (response.status === 204) {
    window.edgeProvider.consoleLog('GOOD GOOD GOOD ')
    return true
  }
  throw new Error(['Could not complete transaction. Code: 003'])
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
    const response = await window.edgeProvider.deprecatedAndNotSupportedDouble(request, url, url2)
    return response
  } catch (e) {
    throw e
  }
}
