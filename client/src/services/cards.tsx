const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getByUser(id: string, token: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/cards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e)
    return null
  }
}
