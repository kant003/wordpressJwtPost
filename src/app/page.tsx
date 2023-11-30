'use client'
import {useFormState} from 'react-dom'
import wordpressAction from './actions/wordpressAction'
import InputControl from './components/input-control'
import FileControl from './components/file-control'
import SelectControl from './components/select-control'
import SubmitButton from './components/submit-button'
import {use, useEffect, useState} from 'react'
import ConfettiButton from './components/confetti-button'
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {IconBlockquote, IconCategory, IconKey, IconPhoto} from '@tabler/icons-react'

function Home() {
  const [state, dispatch] = useFormState(wordpressAction, {message: null, errors: {}})
  const {width, height} = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const [tab, setTab] = useState(1)

  useEffect(() => {
    if (state.errors?.auth) {
      toast.error(state.message)
    }
    if (state.message === 'Entrada creada correctamente') {
      toast.success(state.message)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }, [state.message, state.errors?.auth])

  return (
    <div className="container mx-auto">
      <ToastContainer />
      {showConfetti && <Confetti width={width} height={height} />}
      <h1 className="text-3xl p-3 text-center text-yellow-300">Inserción de contenido</h1>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.message}
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl flex gap-3">
            <IconKey /> Autenticación
          </legend>

          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <InputControl
              value="https://funditea.org"
              title="Dominio"
              name="domain"
              placeholder="Inserte el dominio. Ej https://cocacola.com"
              errors={state.errors?.domain}
            />
            <InputControl
              value=""
              title="Usuario"
              name="username"
              placeholder="Inserte su nombre de usuario"
              errors={state.errors?.username}
            />
            <InputControl
              value=""
              type="password"
              title="Password"
              name="password"
              placeholder="Inserte su password"
              errors={state.errors?.password}
            />
          </div>
        </fieldset>
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl flex gap-3">
            <IconCategory /> Categoría
          </legend>
          <SelectControl
            title="Categoría"
            name="category"
            defaultValue="news"
            options={['campaing', 'news', 'financiations', 'annualAccounts']}
          />
        </fieldset>
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl flex gap-3">
            <IconBlockquote /> Contenido
          </legend>

          <div role="tablist" className="tabs tabs-bordered tabs-lg">
            <input
              type="radio"
              defaultChecked={true}
              name="my_tabs_1"
              role="tab"
              className={`tab before:content-flagES before:mr-2 ${
                state.errors?.titleES || state.errors?.contentES ? 'text-red-400' : ''
              }`}
              aria-label="Español"
            />
            <div role="tabpanel" className="tab-content p-3">
              <InputControl
                title="Título"
                name="titleES"
                placeholder="Inserte el título en español"
                errors={state.errors?.titleES}
              />
              <InputControl
                type="textarea"
                title="Contenido"
                name="contentES"
                placeholder="Inserte el contenido en español"
                errors={state.errors?.contentES}
              />
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              aria-label="Gallego"
              className={`tab before:content-flagGL before:mr-2 ${
                state.errors?.titleGL || state.errors?.contentGL ? 'text-red-400' : ''
              }`}
            />
            <div role="tabpanel" className="tab-content p-3">
              <InputControl
                title="Título"
                name="titleGL"
                placeholder="Inserte el título en gallego"
                errors={state.errors?.titleGL}
              />
              <InputControl
                type="textarea"
                title="Contenido"
                name="contentGL"
                placeholder="Inserte el contenido en gallego"
                errors={state.errors?.contentGL}
              />
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              aria-label="Inglés"
              className={`tab before:content-flagEN before:mr-2 ${
                state.errors?.titleEN || state.errors?.contentEN ? 'text-red-400' : ''
              }`}
            />
            <div role="tabpanel" className="tab-content p-3">
              <InputControl
                title="Título"
                name="titleEN"
                placeholder="Inserte el título en ingles"
                errors={state.errors?.titleEN}
              />
              <InputControl
                type="textarea"
                title="Contenido"
                name="contentEN"
                placeholder="Inserte el contenido en ingles"
                errors={state.errors?.contentEN}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl flex gap-3">
            <IconPhoto /> Foto
          </legend>
          <FileControl
            title="Foto principal"
            accept="image/*,.pdf"
            name="file"
            placeholder="Inserte una imagen"
            errors={state.errors?.file}
          />
        </fieldset>
        {/* <ConfettiButton /> */}
        <SubmitButton className="btn btn-outline btn-primary self-center">Publicar</SubmitButton>
      </form>
    </div>
  )
}

export default Home
