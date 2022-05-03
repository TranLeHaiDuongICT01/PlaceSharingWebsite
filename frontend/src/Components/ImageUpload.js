import { useEffect, useRef, useState } from "react"
import './Component.css'
const ImageUpload = props => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
    const filePicker = useRef()

    useEffect(() => {
        if (!file) return

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])
    const pickedHandler = e => {
        let isFileValid = false
        let pickedFile
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            isFileValid = true
        } else {
            setIsValid = false
            isFileValid = false
        }
        props.onInput(props.id, pickedFile, isFileValid)
    }
    const pickImageHandler = () => {
        filePicker.current.click()
    }

    return (
        <div className="form-control">
            <input ref={filePicker} type="file"
                id={props.id} accept=".jpg,.png,.jpeg"
                style={{ display: 'none' }} onChange={pickedHandler} />
            <div className="image-upload center">
                <div className="image-preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image</p>}
                </div>
                <button onClick={pickImageHandler}>PICK IMAGE</button>
            </div>
        </div>
    )
}

export default ImageUpload