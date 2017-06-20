export function base64toHEX (base64: string): string {
  const raw = atob(base64)
  let HEX = ''

  for (let i = 0; i < raw.length; i++) {
    const _hex = raw.charCodeAt(i).toString(16)
    HEX += _hex.length === 2 ? _hex : '0' + _hex
  }
  return HEX.toUpperCase()
}

export function hexToBase64 (hex: string): string {
  return btoa(
    hex
      .match(/\w{2}/g)
      .map(function (a) {
        return String.fromCharCode(parseInt(a, 16))
      })
      .join('')
  )
}

export function extractPOIId (hex: string): string {
  return hex.substr(2, 4)
}

export function flipOrder (input: string): string {
  return input.substr(2) + input.substr(0, 2)
}

export function IdToChatCode (id: number): string {
  let hexId = id.toString(16)
  if (hexId.length === 3) hexId = '0' + hexId
  const flippedId = flipOrder(hexId)
  const fullHexCode = `04${flippedId}0000`
  return `[&${hexToBase64(fullHexCode)}]`
}
