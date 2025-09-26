const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getCampaigns() {
  return request('/campaigns/');
}

export function createCampaign(payload) {
  return request('/campaigns/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateCampaign(id, payload) {
  return request(`/campaigns/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function getCurrentProfile() {
  return request('/accounts/profiles/me/');
}

export function updateProfile(payload) {
  return request('/accounts/profiles/me/', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
