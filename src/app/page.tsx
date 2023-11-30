'use client'
import {useFormState} from 'react-dom'
import wordpressAction from './actions/wordpressAction'
import InputControl from './components/input-control'
import FileControl from './components/file-control'
import SelectControl from './components/select-control'
import SubmitButton from './components/submit-button'
import {useState} from 'react'
import ConfettiButton from './components/confetti-button'

function Home() {
  const [state, dispatch] = useFormState(wordpressAction, {message: null, errors: {}})

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center text-yellow-300">Inserción de contenido</h1>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.message}
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl">Autenticación</legend>

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
          <legend className="font-bold text-xl">Categoría</legend>
          <SelectControl
            title="Cagtegoría"
            name="category"
            defaultValue="angel"
            options={['campaing', 'news', 'financiations', 'annualAccounts']}
          />
        </fieldset>
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl">Español</legend>
          <InputControl
            title="Título"
            name="titleES"
            placeholder="Inserte el título en español"
            errors={state.errors?.contentES}
          />
          <InputControl
            title="Contenido"
            name="contentES"
            placeholder="Inserte el contenido en español"
            errors={state.errors?.contentES}
          />
        </fieldset>
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl">Galego</legend>
          <InputControl
            title="Título"
            name="titleGL"
            placeholder="Inserte el título en gallego"
            errors={state.errors?.contentGL}
          />
          <InputControl
            title="Contenido"
            name="contentGL"
            placeholder="Inserte el contenido en gallego"
            errors={state.errors?.contentGL}
          />
        </fieldset>
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl">Ingles</legend>

          <InputControl
            title="Título"
            name="titleEN"
            placeholder="Inserte el título en ingles"
            errors={state.errors?.contentEN}
          />
          <InputControl
            title="Contenido"
            name="contentEN"
            placeholder="Inserte el contenido en ingles"
            errors={state.errors?.contentEN}
          />
        </fieldset>
        <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
          <legend className="font-bold text-xl">Foto</legend>
          <FileControl
            title="Foto a subir"
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
