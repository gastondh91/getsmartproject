import React, { useState } from 'react';
import axios from 'axios'

const Subirimg = (props) => {
 var [files, setFile] = useState(null)


  const onImageChange = (e) => {
    setFile(files = e.target.files[0]);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage', files);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };
    axios.post("/api/imagenes/upload", formData, config)
    .then((response) => {
      alert("The file is successfully uploaded");
    }).catch((error) => {
      });
  }


  return (
    <form onSubmit={onFormSubmit}>
      <h1>File Upload</h1>
      <input type="file" name="myImage" onChange={onImageChange} style={{ width: '317px' }} />
      <button type="submit">Upload</button>
    </form>
  )
}



export default Subirimg

