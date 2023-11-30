'use server'
import {z} from 'zod'
import getToken from '../services/getToken.service'
import createPosts, {Category} from '../services/createPost.service'
import uploadMedia from '../services/uploadMedia.service'

const CreateCourseSchema = z.object({
  username: z.string().min(1).max(100),
  contentES: z.string().min(1).max(7000),
  titleGL: z.string().min(1).max(7000)
})

export type State = {
  errors?: {
    domain?: string[]
    username?: string[]
    password?: string[]
    titleES?: string[]
    contentES?: string[]
    titleGL?: string[]
    contentGL?: string[]
    titleEN?: string[]
    contentEN?: string[]
    file?: string[]
    auth?: string[]
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
    titleES,
    contentES,
    titleGL,
    contentGL,
    titleEN,
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
      errors: {auth: ['Autenticación incorrecta.']},
      message: 'Autenticación incorrecta.'
    }
  }

  // esperar 2 segundos usando promesas
  let mediaId
  try {
    mediaId = await uploadMedia(domain, token.jwt_token, formData)
  } catch (errores) {
    console.log(errores)
    return {
      errors: {file: ['Error al subir la imagen.']},
      message: 'Error al subir la imagen.'
    }
  }

  const firstPost = await createPosts(domain, token.jwt_token, {
    title: titleES,
    content: contentES,
    category: category,
    language: 'es',
    imageId: mediaId
  })

  if (category !== 'annualAccounts') {
    const secondPost = await createPosts(domain, token.jwt_token, {
      title: titleGL,
      content: contentGL,
      category: category,
      language: 'gl',
      imageId: mediaId
    })

    const thirdPost = await createPosts(domain, token.jwt_token, {
      title: titleEN,
      content: contentEN,
      category: category,
      language: 'en',
      imageId: mediaId
    })
  }

  return {
    message: 'Entrada creada correctamente'
  }
}
