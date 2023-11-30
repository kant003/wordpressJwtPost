'use client'
import {useTransition} from 'react'

interface Props {
  children: string
  className?: string
  onSubmit?: () => void
}

function SubmitButton({children, className = '', onSubmit}: Props) {
  let [isPending, startTransition] = useTransition()

  function handleSubmit() {
    onSubmit && onSubmit()
  }

  return (
    <button
      className={isPending ? className + ' btn-disabled' : className}
      type="submit"
      onClick={() => startTransition(handleSubmit)}
    >
      {isPending ? <>Publicando espere...</> : <>{children}</>}
    </button>
  )
}

export default SubmitButton
