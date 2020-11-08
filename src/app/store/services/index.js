import { rest } from '@/app/global/services'

export async function getResource (url) {
  return rest.get(url).then(res => res.data)
}
export async function createResource ({ url, payload }) {
  return rest.post(url, payload).then(res => res.data)
}
export async function updateResource ({ url, payload }) {
  return rest.put(url, payload).then(res => res.data)
}
export async function deleteResource (url) {
  return rest.delete(url).then(res => res.data)
}
