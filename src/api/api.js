// @flow
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
  const result = await window.fetch(url, request)
  const newData = result.json()
  return newData
}
