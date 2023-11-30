'use server'

const validateToken = async (domain: string, token: string) => {
  const URL = domain + '/wp-json/api/v1/token-validate?token=' + token

  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })

  if (response.ok) {
    const data = await response.json()
    const token = data // El token JWT

    return token
  } else {
    console.error('Error al iniciar sesión')
  }
}

export default validateToken
