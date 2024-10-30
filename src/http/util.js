const ADDRS = {
  default: process.env.NEXT_PUBLIC_API_ADDR,
  recepcion: process.env.NEXT_PUBLIC_RECEPCION_ADDR,
  ichigo: process.env.NEXT_PUBLIC_ICHIGO_ADDR,
}

export const addr = (service) => ADDRS[service] || ADDRS["default"]

export const url = (service, apiVersion) => `${addr(service)}/api/${apiVersion}`

export function getRequest(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch(e => {
      console.error(e)
    })
}

export function postRequest(url, body) {
  return fetch(
    url,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .catch(e => {
      console.error(e)
    })
}

export async function postFileRequest(url, file) {
  const formData = new FormData()
  formData.append('file', file)

  return fetch(
    url,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    })
    .then((res) => res.text())
    .catch(e => {
      console.error(e)
    })
}

export function patchRequest(url, body) {
  return fetch(
    url,
    {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res) => res.json())
}

export function deleteRequest(url) {
  return fetch(url, {method: "DELETE"})
    .then((res) => res.json())
    .catch(e => {
      console.error(e)
    })
}
