const BASE_URL = '/api/employees'

async function handleResponse(response) {
  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

export function getEmployees() {
  return fetch(BASE_URL).then(handleResponse)
}

export function createEmployee(employee) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  }).then(handleResponse)
}

export function updateEmployee(id, employee) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  }).then(handleResponse)
}

export function deleteEmployee(id) {
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handleResponse)
}
