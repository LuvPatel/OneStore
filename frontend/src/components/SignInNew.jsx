import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import amplifyOutput from '../amplify-output'; // Updated import path
import CryptoJS from 'crypto-js';
import './SignInNew.css'

// import userStore from '@/lib/store/userStore';

Amplify.configure(amplifyOutput);

const SignInNew = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { setUserRoleAndId, userRole } = userStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);

    try {
      await signOut();
      await signIn({ username: email, password });
      const authSession = await fetchAuthSession();
      console.log(authSession);
      const userEmail = authSession.tokens.idToken.payload["email"];
      console.log("token", authSession.tokens.idToken);
      const secretKey = process.env.REACT_APP_SECRET_KEY;
      console.log("logged in user email : ", userEmail);
      localStorage.setItem('user_mail', CryptoJS.AES.encrypt(userEmail, secretKey).toString());
      localStorage.setItem('user_mail_new', userEmail);
      const userId = authSession.tokens.idToken.payload["sub"];
      console.log("user id logged in :", userId);
      localStorage.setItem("user_id", userId);
      
      localStorage.setItem("idToken", authSession.tokens.idToken.jwtToken);
      // setUserRoleAndId(userRole, userId);
      toast.success('Sign in successful!');
      navigate('/');
    } catch (error) {
      console.log("Error : ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectToSignUp = () => {
    navigate('/signupnew'); // Redirect to the sign-up page
  };
  return (
    <div className="signin-container">
    <div className="signin-form">
      <h2 className="signin-heading">OneStore</h2>
      <h2 className="signin-heading">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signin-form-content">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
            className="form-input"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
            className="form-input"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="signup-link">
          <p>Don't have an account?</p>
          <button onClick={redirectToSignUp} className="signup-button">
            Sign Up
          </button>
      </div>
    </div>
  </div>
  );
};

export default SignInNew;
