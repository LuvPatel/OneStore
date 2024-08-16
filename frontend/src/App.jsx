import logo from './logo.svg';
import './App.css';
import FileUpload from './components/Upload/FileUpload';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation/navigation';
import { useNavigate } from 'react-router-dom';
import ListFiles from './components/myFiles/ListFiles';
import ProtectedRoute from './components/ProtectedRoute';
import useEvent from '@testing-library/user-event';
import HomePage from './components/HomePage/HomePage';
import { UserProvider } from './components/UserContext';
import SignUpNew from './components/SignUpNew';
import SignInNew from './components/SignInNew';
import { signOut } from 'aws-amplify/auth';
import toast from 'react-hot-toast';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  // const navigate = useNavigate();

  const handleSignOut = async () => {
    // localStorage.removeItem('encrypted_id_token');
    // localStorage.removeItem('encrypted_access_token');
    // localStorage.removeItem('encrypted_refresh_token');
    // localStorage.removeItem('user_id');

    // setUserId(null);
    // const clientId = process.env.REACT_APP_CLIENT_ID
    // console.log(process.env.REACT_APP_REDIRECT_URL);
    // console.log(process.env.REACT_APP_TEMP);
    // const logoutUrl = `${process.env.REACT_APP_TEMP}?client_id=${process.env.REACT_APP_CLIENT_ID}&logout_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URL)}`;
    // console.log('Logout URL:', logoutUrl);
    // window.location.href = logoutUrl;

    try {
      await signOut();
      localStorage.removeItem('user_mail');
      localStorage.removeItem('user_id');
      localStorage.removeItem('idToken');
      localStorage.removeItem('email');
      toast.success('Signed out successfully!');
      window.location.href = '/';
    } catch (error) {
      console.log("Error signing out:", error);
      toast.error('Error signing out. Please try again.');
    }

  };
  return (
    <>
     <UserProvider>
      <Router>
          <Routes>
            <Route path="/" element={
              <>
                <Navigation userId={userId} handleSignOut={handleSignOut} />
                {/* <FileUpload userId={userId}/> */}
                <HomePage />
                
              </>
            } />
            <Route path="/upload" element={<FileUpload userId={userId} setUserEmail={setUserEmail} userEmail={userEmail} />}/>
            <Route path="/myFiles" element={<ListFiles userId={userId}/>}/>
            <Route path="/signupnew" element={<SignUpNew/>}/>
            <Route path="/signinnew" element={<SignInNew/>}/>
          </Routes>
        </Router>
        </UserProvider>
    </>
  );
}

export default App;
