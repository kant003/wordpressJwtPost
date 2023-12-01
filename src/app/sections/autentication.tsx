import {IconKey} from '@tabler/icons-react'
import React from 'react'
import InputControl from '../components/input-control'
import {State} from '../actions/wordpressAction'

interface Props {
  state: State
}
function Autentication({state}: Props) {
  return (
    <fieldset className="border border-yellow-400 rounded p-4 flex flex-col grow">
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
  )
}

export default Autentication
