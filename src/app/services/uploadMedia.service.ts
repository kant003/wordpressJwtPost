'use server'

const uploadMedia = async (domain: string, token: string, formData: FormData) => {
  const URL = domain + '/wp-json/wp/v2/media'
  const file = formData.get('file') as File
  console.log('subiendo:', file)
  if (file.size <= 0) return null

  formData.append('file', file)
  //formData.append('data', JSON.stringify(data))
  formData.append('caption', 'el cap')
  formData.append('title', 'el titulo')
  formData.append('alt_text', 'el alter')
  formData.append('status', 'publish')
  formData.append('media_type', 'image')
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      //'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: formData
  })
  console.log('inic')
  if (response.ok) {
    const data = await response.json()
    const posts = data // El token JWT

    console.log(posts)

    return data.id
  } else {
    console.error('Error al subir la imagen:')
    return null
  }
}

export default uploadMedia
