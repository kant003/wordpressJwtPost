import React from 'react'
interface Props {
  title: string
  name: string
  value?: string
  placeholder: string
  errors?: string[]
  type?: 'text' | 'password'
  className?: string
}

function InputControl({title, name, value, placeholder, errors, type = 'text', className}: Props) {
  return (
    <label className={`flex flex-row w-full ${className}`}>
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <input
        name={name}
        defaultValue={value}
        type={type}
        placeholder={placeholder}
        className={`${errors ? 'input-error' : ''} input input-sm input-bordered w-full`}
      />
      <div className="label">
        <span className="label-text-alt">
          {errors &&
            errors.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </span>
      </div>
    </label>
  )
}

export default InputControl
