"use client"
import React, { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '@/app/services/firebase';
import {useRouter} from 'next/navigation';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword]=useCreateUserWithEmailAndPassword(auth);
    //console.log({createUserWithEmailAndPassword});
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const router=useRouter();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit =async (e) => {
    try{
        e.preventDefault();
        console.log({email,password});
        const res=await createUserWithEmailAndPassword(email,password);
        console.log({res});
        if(typeof window !=='undefined')
        sessionStorage.setItem('user',true);
        router.push('/');
        setEmail('');
        setPassword('');
    }catch(error){
        console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <form >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={(e)=>{handleSubmit(e)}}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
