// @flow

export const writeData = async (data: Object): Promise<void> => {
  const out = {}
  Object.keys(data).forEach(key => {
      out[key] = typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key])
    }
  )
  await window.edgeProvider.writeData(out)
}

export const readData = async (keys: string[]): Promise<Object> => {
  const data = await window.edgeProvider.readData(keys)
  const out = {}
  Object.keys(data).forEach(key => {
      let value = data[key]
      try {
        value = JSON.parse(data[key])
      } catch (e) {
        // oops not JSON
      }
      out[key] = value
    }
  )
  return out
}
