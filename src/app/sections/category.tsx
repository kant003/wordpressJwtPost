import {IconCategory} from '@tabler/icons-react'
import React from 'react'
import SelectControl from '../components/select-control'
import {State} from '../actions/wordpressAction'
interface Props {
  state: State
}
function Category({state}: Props) {
  return (
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
  )
}

export default Category
