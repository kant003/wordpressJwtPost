import {IconPhoto} from '@tabler/icons-react'
import FileControl from '../components/file-control'
import {State} from '../actions/wordpressAction'
import {useState, ChangeEvent, FormEvent} from 'react'

interface Props {
  state: State
}
function Picture({state}: Props) {
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  return (
    <fieldset className="border border-yellow-400 rounded p-4 flex flex-col">
      <legend className="font-bold text-xl flex gap-3">
        <IconPhoto /> Foto
      </legend>

      {/*  <input type="file" onChange={handleFileChange} multiple />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name}
            <button type="button" onClick={() => handleRemoveFile(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul> */}

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
