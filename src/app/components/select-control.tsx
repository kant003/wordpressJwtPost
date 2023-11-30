import React from 'react'

interface Props {
  title: string
  name: string
  defaultValue: string | number | undefined
  autoFocus?: boolean
  options: string[]
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function SelectControl({title, name, defaultValue, autoFocus, options, onChange}: Props) {
  return (
    <div className="form-control flex flex-col">
      <label className="label" htmlFor={name}>
        <span className="label-text block md:text-right mb-1 md:mb-0 ">{title}</span>
      </label>
      <select
        className="select select-bordered w-fit"
        name={name}
        id={name}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectControl
