const API_BASE = '/api';

export async function fetchTemplates(category) {
  const params = category && category !== 'all' ? `?category=${category}` : '';
  const res = await fetch(`${API_BASE}/templates${params}`);
  const data = await res.json();
  return data.data;
}

export async function fetchTemplate(id) {
  const res = await fetch(`${API_BASE}/templates/${id}`);
  const data = await res.json();
  return data.data;
}

export async function createProject(templateId) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateId }),
  });
  const data = await res.json();
  return data.data;
}

export async function updateProject(id, updates) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  return data.data;
}

export async function publishProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}/publish`, {
    method: 'POST',
  });
  const data = await res.json();
  return data.data;
}

export async function fetchProject(id) {
  const res = await fetch(`${API_BASE}/projects/${id}`);
  const data = await res.json();
  return data.data;
}

export async function createOrder({ projectId, productId, shipping }) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, productId, shipping }),
  });
  const data = await res.json();
  return data.data;
}
