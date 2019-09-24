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

export async function getOrders() {
  const request = {
    method: 'GET',
    headers: {
      'Host': 'exchange.api.bity.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }
  const url = 'https://exchange.api.bity.com/v2/orders'
  try {
    const result = await window.fetch(url, request)
    window.edgeProvider.consoleLog('response get orders ')
    window.edgeProvider.consoleLog(result)

    if(result.status === 200) {
      const newData = await result.json()
      window.edgeProvider.consoleLog('newData')
      window.edgeProvider.consoleLog(newData)
      return newData
    }
    window.edgeProvider.consoleLog('response get orders ')
    window.edgeProvider.consoleLog(result)
    throw new Error('Can not get orders result side')
  } catch (e) {
    throw new Error('Can not get orders')
  }
}
export async function getOrderDetail(orderId: string) {
  const request = {
    method: 'GET',
    headers: {
      'Host': 'exchange.api.bity.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  }
  const url = 'https://exchange.api.bity.com/v2/orders/' + orderId
  try {
    const response = await window.fetch(url, request)
    window.edgeProvider.consoleLog('What code is the response ', response.status)
    if(response.status === 200) {
      const newData = await response.json()
      window.edgeProvider.consoleLog('newData')
      window.edgeProvider.consoleLog(newData)
      return newData
    }
    throw new Error('Could not get the wire payment information')
  } catch (e) {
    window.edgeProvider.consoleLog('We are in an error here handle it')
    window.edgeProvider.consoleLog(e)
    throw e
  }
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
    console.log('What code is the response ', response.status)
    return response
  } catch (e) {
    console.log('We are in an error here handle it')
    console.log(e)
    throw e
  }
}
