const API_URL = import.meta.env.VITE_API_BASE_URL; 

export const getUserInfo = async () => {
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${API_URL}/profile/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  const data = await response.json();
  return data; 
};


export async function updateUser(updatedData) {

  const token = localStorage.getItem("token")
  const res = await fetch(`${API_URL}/profile/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update user');
  }

  const data = await res.json();
  return data;
}


