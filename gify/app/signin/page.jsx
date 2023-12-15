"use client";
import {useState} from 'react'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '@/app/services/firebase';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

function Page() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword]=useSignInWithEmailAndPassword(auth);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const router=useRouter();

  const handleSubmit = async(e) => {
    try{
        e.preventDefault();
        console.log({email,password});
        const res=await signInWithEmailAndPassword(email,password);
        console.log({res});
        if(res){
          sessionStorage.setItem('user',true);
        setEmail('');
        setPassword('');
        router.push('/');
        }
        
    }catch(error){
        console.error('Error during sign-up:', error);
    }

  };    
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      <form >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={(e)=>{handleSubmit(e)}}>
          Sign In
        </button>
      </form>
   <Link href="/sign-up"><p>Sign up if you are a New User</p></Link>
    </div>
  </div>
    </div>
  )
}

export default Page
