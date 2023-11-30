'use server'
type Category = 'campaing' | 'news' | 'financiations' | 'annualAccounts'
type Language = 'es' | 'gl' | 'en'

type Data = {
  title: string
  content: string
  language: Language
  category: Category
  imageId: number | null
}

enum Asociations {
  'campaing-es' = 3,
  'campaing-gl' = 45,
  'campaing-en' = 47,
  'news-es' = 4,
  'news-gl' = 20,
  'news-en' = 24,
  'financiations-es' = 9,
  'financiations-gl' = 58,
  'financiations-en' = 60,
  'annualAccounts-es' = 6
}
const createPosts = async (domain: string, token: string, data: Data): Promise<boolean> => {
  const URL = domain + '/wp-json/wp/v2/posts?lang=' + data.language

  const s = data.category + '-' + data.language
  const category = Asociations[s as keyof typeof Asociations]

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      status: 'publish',
      categories: [category],
      featured_media: data.imageId,
      comment_status: 'closed'
    })
  })

  if (response.ok) {
    const data = await response.json()
    const posts = data // El token JWT

    return true
  } else {
    console.error('Error al crear post')
    return false
  }
}

export default createPosts
export type {Category, Language}
