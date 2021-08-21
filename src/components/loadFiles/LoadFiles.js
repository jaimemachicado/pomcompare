import React, {useCallback, useMemo, useState} from 'react';
import AlertError from '../alertError/AlertError';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

function LoadFiles(props) {
    const [pomContent, setPomContent] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [fileName, setFileName] = useState("");

    const onDrop = useCallback((acceptedFiles,fileRejections) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.onload = () => {
            setPomContent(reader.result);
          }
          reader.readAsText(file);
          setShowAlert(false);
        });

        fileRejections.forEach((fileRejected) => {
          setFileName(fileRejected.file.name);
          setShowAlert(true);
        });
        
      }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: '.xml', onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.xml files will be accepted)</em>
      </div>
      {showAlert && <AlertError fileName={fileName}/>}
      <aside>
        <h4>File content:</h4>
        <ul>{pomContent}</ul>
      </aside>
    </div>
  );
}
export default LoadFiles;