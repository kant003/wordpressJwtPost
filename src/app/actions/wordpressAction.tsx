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

  // console.log('formData', formData)

  const inputObject = formData.entries() as unknown as [string, any][]
  const ficheros = []

  for (const [clave, valor] of inputObject) {
    //if (valor instanceof File) {
    // console.log(`${clave}: ${valor}`)
    // console.log(typeof valor)

    if (typeof valor === 'object') {
      //console.log('es un objeto')
      const f = valor as File
      //console.log(f.name)
      ficheros.push(f)
    }
    //}
  }
  //console.log('ficheros', ficheros)

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
  //const mediaId = await uploadMedia(domain, token.jwt_token, formData).id
  let mediaId: number | null = null
  let content = ''
  for (let i = 0; i < ficheros.length; i++) {
    //ficheros.forEach(async (f, i) => {
    const f = ficheros[i]
    if (f.type.startsWith('image') && mediaId === null) {
      const media = await uploadMedia(domain, token.jwt_token, new FormData(), f)
      mediaId = media.id
      //console.log('ponemso imagen portada:', media.id)
    } else {
      const media = await uploadMedia(domain, token.jwt_token, new FormData(), f)
      if (f.type === 'application/pdf') {
        content += `<br> <div style="width:100%"> <iframe src="${media.source_url}" width="100%" height="600px"></iframe> </div>`
        content += `<br> <a href="${media.source_url}" target="_blank">Descargar PDF</a>`
        //console.log('ponemos pdf:', media.source_url)
      }
      if (f.type.startsWith('image')) {
        content += `<br> <img src="${media.source_url}" alt="${f.name}" />`
        //console.log('ponemos imagen:', media.source_url)
      }
    }
  }

  console.log('c', content)
  const firstPost = await createPosts(domain, token.jwt_token, {
    title: titleES,
    content: contentES + content,
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
*/
  return {
    message: 'Entrada creada correctamente'
  }
}
