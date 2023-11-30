'use server'
import {z} from 'zod'
import getToken from '../services/getToken.service'
import createPosts, {Category} from '../services/createPost.service'
import uploadMedia from '../services/uploadMedia.service'

const CreateCourseSchema = z.object({
  username: z.string().min(1).max(100),
  contentES: z.string().min(1).max(7000)
})

export type State = {
  errors?: {
    domain?: string[]
    username?: string[]
    password?: string[]
    contentES?: string[]
    contentGL?: string[]
    contentEN?: string[]
    file?: string[]
  }
  message?: string | null
}

type Post = z.infer<typeof CreateCourseSchema>

export default async function wordpressAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const domain = formData.get('domain') as string
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const category = formData.get('category') as Category
  const titleES = formData.get('titleES') as string
  const contentES = formData.get('contentES') as string
  const titleGL = formData.get('titleGL') as string
  const contentGL = formData.get('contentGL') as string
  const titleEN = formData.get('titleEN') as string
  const contentEN = formData.get('contentEN') as string
  const file = formData.get('file') as File

  const validatedFields = CreateCourseSchema.safeParse({
    domain,
    username,
    password,
    contentES,
    contentGL,
    contentEN
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.'
    }
  }

  const token = await getToken(domain, username, password)
  if (!token) {
    return {
      message: 'Autenticación incorrecta.'
    }
  }

  // esperar 2 segundos usando promesas
  const mediaId = await uploadMedia(domain, token.jwt_token, formData)
  console.log('mediaId:', mediaId)

  const firstPost = await createPosts(domain, token.jwt_token, {
    title: titleES,
    content: contentES,
    category: category,
    language: 'es',
    imageId: mediaId
  })
  /*
  if (category !== 'annualAccounts') {
    const secondPost = await createPosts(domain, token.jwt_token, {
      title: titleGL,
      content: contentGL,
      category: category,
      language: 'gl'
    })

    const thirdPost = await createPosts(domain, token.jwt_token, {
      title: titleEN,
      content: contentEN,
      category: category,
      language: 'en'
    })
  } */

  return {
    message: 'Todo OK.'
  }
}
