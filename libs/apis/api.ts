// SAMPLE API
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// GET 요청
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// POST 요청
export async function createUser(userData: { name: string; email: string }) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}
