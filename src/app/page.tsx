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
import Autentication from './sections/autentication'
import Category from './sections/category'
import Content from './sections/content'
import Picture from './sections/picture'

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
        <div className="flex flex-col lg:flex-row grow gap-3 justify-between">
          <Autentication state={state} />
          <Category state={state} />
        </div>
        <Content state={state} />
        <Picture state={state} />

        {/* <ConfettiButton /> */}
        <SubmitButton className="btn btn-outline btn-primary self-center">Publicar</SubmitButton>
      </form>
    </div>
  )
}

export default Home
