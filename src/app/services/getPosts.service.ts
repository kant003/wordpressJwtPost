'use server'
const getPosts = async (domain: string, token: string) => {
  const URL = domain + '/wp-json/wp/v2/posts'

  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })

  if (response.ok) {
    const data = await response.json()
    const posts = data // El token JWT

    return posts
  } else {
    console.error('Error al iniciar sesión')
  }
}

export default getPosts
