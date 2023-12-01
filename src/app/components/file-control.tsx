interface Props {
  title: string
  id?: string
  name: string
  placeholder: string
  errors?: string[]
  type?: 'text' | 'password'
  className?: string
  accept?: string
}

function FileControl({title, id, name, placeholder, errors, className, accept}: Props) {
  return (
    <label className={`w-full ${className}`}>
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <input
        type="file"
        id={id}
        accept={accept}
        className="file-input file-input-sm file-input-bordered w-full"
        name={name}
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

export default FileControl
