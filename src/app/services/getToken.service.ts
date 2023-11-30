'use server'
const getToken = async (domain: string, username: string, password: string) => {
  const URL = domain + '/wp-json/api/v1/token'

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })

  if (response.ok) {
    const data = await response.json()
    const token = data // El token JWT

    // Luego de obtener el token, puedes realizar otras operaciones
    // Por ejemplo, obtener datos del usuario
    //getUserData(token);
    console.log(token)

    return token
  } else {
    console.error('Error al iniciar sesión')
    return null
  }
}

export default getToken
