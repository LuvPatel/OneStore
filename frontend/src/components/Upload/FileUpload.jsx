
import React, { useState, useContext } from "react";
import axios from 'axios';
import './FileUpload.css';
import { Navigation } from "../Navigation/navigation";
import { UserContext } from '../UserContext';
import CryptoJS from "crypto-js";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { userEmail } = useContext(UserContext);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64File = reader.result.split(',')[1]; // Remove the data URL part
      const userId = localStorage.getItem("user_id");
    const fileExtension = file.name.split('.').pop();

    // Append the file extension to the new file name
    const newFileName = `${fileName}.${fileExtension}`;
      try {
        // const response = await axios.post(`https://44nu31b4ld.execute-api.us-east-1.amazonaws.com/dev/uploadFIle`, 
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/uploadFile`, 
          {
            userId: userId,
            fileContent: base64File,
            fileName: newFileName
          }, {
            headers: {
              // 'Content-Type': 'application/json',
              // 'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
              // 'Access-Control-Allow-Credentials': true,
              // 'Access-Control-Allow-Origin': '*',
            }
        });

        console.log('Upload response:', response.data);
        alert("File uploaded successfully");
        
        const user_mail = localStorage.getItem('user_mail'); 
        const user_mail_new = localStorage.getItem('user_mail_new');
        console.log("user_mail", user_mail);
        const Email = (CryptoJS.AES.decrypt(user_mail, process.env.REACT_APP_SECRET_KEY)).toString(CryptoJS.enc.Utf8);
        console.log("User Email for upload file : ", Email);
        // const noti_res = await axios.post('https://gloawmwa7lxbzuu2ik5rondnsi0bqvpz.lambda-url.us-east-1.on.aws/' , {
        //   email : Email
        // });
        const noti_res = await axios.post(`${process.env.REACT_APP_API_URL}/uploadMail` , {
          email : Email
        });
        setFile(null);
        setFileName("");
        document.getElementById("file-upload").value="";
      } catch (error) {
        console.error('Error uploading file', error);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName("");
    document.getElementById("file-upload").value = "";
  };

  return (
    <>
      <Navigation/>
      <div className="upload-container">
        <div className="form-container">
          <div className="upload-form">
            <h2>Upload File</h2>
            <form>
              <div className="form-group">
                <label htmlFor="file-upload" className="file-label">Choose a file:</label>
                <input 
                  type="file" 
                  id="file-upload" 
                  onChange={handleChange} 
                  className="file-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name" className="file-label">File Name: </label>
                <input 
                  type="text" 
                  className="file-input" 
                  id="fileName" 
                  value={fileName} 
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <div>
                <button 
                  type="button" 
                  onClick={handleUpload} 
                  className="upload-button"
                >
                  Upload File
                </button>
                {file && (
                <div className="file-info">
                  <p>Selected file: {file.name}</p>
                  <button 
                    type="button" 
                    onClick={handleRemove} 
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadForm;
