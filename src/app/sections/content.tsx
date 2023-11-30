import {IconBlockquote} from '@tabler/icons-react'
import React from 'react'
import InputControl from '../components/input-control'
import {State} from '../actions/wordpressAction'
interface Props {
  state: State
}
function Content({state}: Props) {
  return (
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
  )
}

export default Content
