import {IconPhoto} from '@tabler/icons-react'
import React from 'react'
import FileControl from '../components/file-control'
import {State} from '../actions/wordpressAction'
interface Props {
  state: State
}
function Picture({state}: Props) {
  return (
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
  )
}

export default Picture
