import React, {useCallback, useState} from 'react'
import {DropzoneOptions, useDropzone} from 'react-dropzone'
import {IconCategory, IconFileDatabase, IconFileText} from '@tabler/icons-react'
type FileWithPreview = File & {
  preview: string
}
interface Props {
  onDrop: (acceptedFiles: File[]) => void
  removeFile: (file: FileWithPreview) => void
  files: FileWithPreview[]
}
const FileUploadForm = ({onDrop, removeFile, files}: Props) => {
  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/svg+xml': ['.svg'],
      'application/pdf': ['.pdf']
    }
  }

  const {getRootProps, getInputProps} = useDropzone(dropzoneOptions)

  return (
    <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
      <legend className="font-bold text-xl flex gap-3">
        <IconFileDatabase /> Archivos
      </legend>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta los archivos aquí o haz clic para seleccionar archivos</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <ul className="flex gap-4 items-end flex-wrap">
            {files.map(file => (
              <li key={file.name} className="tooltip" data-tip={file.name}>
                {file.type.startsWith('image') && (
                  <img src={file.preview} alt={file.name} style={{width: '100px'}} />
                )}
                {!file.type.startsWith('image') && <IconFileText size={100} />}
                <button onClick={() => removeFile(file)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  )
}

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer'
}

export default FileUploadForm
