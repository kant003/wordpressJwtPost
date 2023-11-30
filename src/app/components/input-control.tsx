import React from 'react'
interface Props {
  title: string
  name: string
  value?: string
  placeholder: string
  errors?: string[]
  type?: 'text' | 'password' | 'textarea'
  className?: string
}

function InputControl({title, name, value, placeholder, errors, type = 'text', className}: Props) {
  return (
    <label className={`flex flex-col ${className}`}>
      <div className="label">
        <span className="label-text block md:text-right mb-1 md:mb-0 ">{title}</span>
      </div>
      {type !== 'textarea' && (
        <input
          name={name}
          defaultValue={value}
          type={type}
          placeholder={placeholder}
          className={`${errors ? 'input-error' : ''} input grow input-sm input-bordered`}
        />
      )}

      {type === 'textarea' && (
        <textarea
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          className={`${
            errors ? 'textarea-error' : ''
          } textarea textarea-sm textarea-bordered h-24 w-full`}
        />
      )}
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
