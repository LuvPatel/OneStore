import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation } from '../Navigation/navigation';
import './ListFiles.css';

const ListFiles = () => {
    const[files,setFiles] = useState([]);
    const handleDownload = (url) => {
        window.open(url);
    }
    const handleDelete = (file_key) => {
        const Id = localStorage.getItem('user_id');
        // const res = axios.post('https://zy2yxmilnsowysyliznxaoecfi0eolqm.lambda-url.us-east-1.on.aws/', {
        //     file_key : file_key,
        //     userId : Id
        // });
        // const res = axios.post(`https://44nu31b4ld.execute-api.us-east-1.amazonaws.com/dev/deleteFile`, {
        const res = axios.post(`${process.env.REACT_APP_API_URL}/deleteFile`, {
              file_key : file_key,
              userId : Id
        });
        alert("File Deleted Successfully!");
        setFiles(files.filter(file => file.file_key !== file_key));
    }
    useEffect(() => {
        const fetchFiles = async () => {
          try {
            const userId = localStorage.getItem('user_id');
            console.log(process.env);
            // const response = await axios.get('https://irvpmcmebf7j2r3perw57gpqpe0zcodh.lambda-url.us-east-1.on.aws/', {
            //   params: {
            //     userId: userId
            //   }
            // });
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listFiles`, {
              params: {
                userId: userId
              }
            });
            const filesData = JSON.parse(response.data.body);
            setFiles(filesData);
            if(Array.isArray(response.data)){
              
              // setFiles(response.data.body);
            }
            console.log("response_data",response.data);
            // setFiles(response.data['body']);
          } catch (error) {
            alert("Error fetching files, please try later!!");
            console.error('Error fetching files', error);
          }
        };
    
        fetchFiles();
      }, []);


      return (
        <>
        <Navigation/>
        <div className='file-container'>
            <h2>My Files</h2>
            {files.length === 0 ? (
            <p>No files uploaded <br/>Uploaded files appear here as you add them to cloud.</p>
            ) : (
            <ul className='display-list'>
                {files.map((file, index) => (
                <li key={index} className='display-item'>
                    {/* <h3>{file.fileName.split('_').pop()}</h3> */}
                    <h3>{file.fileName}</h3>
                    <button onClick={() => handleDownload(file.url)} className='download-button'>
                        Download
                    </button>
                    <button onClick={() => handleDelete(file.file_key)} className='delete-button'>
                        Delete
                    </button>
                    {/* <a href={file.url} download={file.fileName}>{file.fileName}</a> */}
                </li>
                ))}
            </ul>
            )}
        </div>
        </>
      );
};

export default ListFiles;