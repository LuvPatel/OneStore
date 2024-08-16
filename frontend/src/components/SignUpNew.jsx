// import React, { useState } from 'react';
// import { Amplify } from 'aws-amplify';
// import { signUp } from 'aws-amplify/auth';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { z } from "zod";
// import { zodResolver } from '@hookform/resolvers/zod';

// import amplifyOutput from '../amplify-output';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Label } from './ui/label';

// Amplify.configure(amplifyOutput);

// const schema = z.object({
//   email: z.string().min(1, "Email is required.").email('Invalid email address'),
//   given_name: z.string().min(1, "Given given_name is required."),
//   password: z.string()
//     .min(8, 'Password must be at least 8 characters')
//     .regex(/[0-9]/, 'Password must contain at least one number')
//     .regex(/[!@#$%^&*]/, 'Password must contain at least one special character')
//     .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
//     .regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// const SignUpNew = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data) => {
//     const { email, given_name, password } = data;

//     setLoading(true);

//     try {
//        // Log the data to verify before making the signUp call
//        console.log('Submitting sign up with data:', {
//         username: email,
//         password,
//         attributes: {
//           email,          // Standard attribute
//           // given_name,     // Standard attribute as per your Cognito schema
//         },
//       });
//       await signUp({
//         username: email,
//         password,
//         attributes: {
//           email,
//           // given_name: given_name,  // Ensure this matches the required attribute given_name in Cognito
//         },
//       });
//       navigate('/signinnew');
//     } catch (error) {
//       console.log('Error signing up:', error);
//       toast.error(error.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="Email"
//             {...register('email')}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && <p className="text-red-600">{errors.email.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="given_name">Given given_name</Label>
//           <Input
//             id="given_name"
//             type="text"
//             placeholder="Given given_name"
//             {...register('given_name')}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.given_name && <p className="text-red-600">{errors.given_name.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             placeholder="Password"
//             {...register('password')}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && <p className="text-red-600">{errors.password.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="confirmPassword">Confirm Password</Label>
//           <Input
//             id="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             {...register('confirmPassword')}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
//         </div>
//         <Button disabled={loading} type="submit" className={`w-full text-white py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
//           Sign Up
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default SignUpNew;



import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import amplifyOutput from '../amplify-output';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import axios from 'axios';
import './SignUpNew.css';

Amplify.configure(amplifyOutput);

const SignUpNew = () => {
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [email, setEmail] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const { email, given_name, password } = data;
    setLoading(true);

    try {
      await signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      setEmail(email); // Store email for the verification step
      console.log('email',email);
      setVerificationStep(true);
      toast.success('Sign up successful! Please check your email for the verification code.');
    } catch (error) {
      console.log('Error signing up:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (data) => {
    const { code } = data;
    setLoading(true);

    try {
      console.log('email before signup confrm', email);
      // const response = axios.post("https://44nu31b4ld.execute-api.us-east-1.amazonaws.com/dev/confirmUser", {
        const response = axios.post(`${process.env.REACT_APP_API_URL}/confirmUser`, {
        "userPoolId": process.env.REACT_APP_USER_POOL_ID,
        "username": email
      });
      console.log("response", response);
      toast.success('Email verified successfully!');
      navigate('/signinnew'); // Redirect to sign-in page after successful verification
    } catch (error) {
      console.log('Error confirming sign up:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const redirectToSignIn = () => {
    navigate('/signinnew'); // Redirect to the sign-up page
  };
  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2 className="signin-heading">
          {verificationStep ? 'Verify Your Email' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit(verificationStep ? handleVerifyCode : handleSignUp)} className="signin-form-content">
          {!verificationStep ? (
            <>
              <div className="form-group">
                <Label htmlFor="email" className="form-label">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className="form-input"
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="given_name" className="form-label">Given Name</Label>
                <Input
                  id="given_name"
                  type="text"
                  placeholder="Given Name"
                  {...register('given_name')}
                  className="form-input"
                />
                {errors.given_name && <p className="error-message">{errors.given_name.message}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="password" className="form-label">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                  className="form-input"
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="confirmPassword" className="form-label">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                  className="form-input"
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
              </div>
            </>
          ) : (
            <div className="form-group">
              <Label htmlFor="code" className="form-label">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter verification code"
                {...register('code')}
                className="form-input"
              />
              {errors.code && <p className="error-message">{errors.code.message}</p>}
            </div>
          )}
          <Button disabled={loading} type="submit" className={`submit-button ${loading ? 'loading' : ''}`}>
            {verificationStep ? 'Verify Code' : 'Sign Up'}
          </Button>
        </form>
        <div className="signin-link">
          <p>Don't have an account?</p>
          <button onClick={redirectToSignIn} className="signin-button">
            Sign In
          </button>
      </div>
      </div>
    </div>
  );
};

export default SignUpNew;
