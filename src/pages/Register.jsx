import React, {useState} from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register () {
    const [name, setName] = useState('')
    const [lastName,setLastName]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')

    const { registerUser, signUpProvider } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        const displayName = `${name} ${lastName}`
        registerUser(email, password, displayName)
    }
    return (
        <div className='overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main'>

        <div className='mt-[10vh] mx-auto overflow-hidden w-[380px] relative h-[500px] rounded-[8px] dark:bg-[#1c1c1c]
           before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%]
    after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%]
    custom-linear-gradient
      ' >
        <form
        className='absolute inset-[2px] rounded-[8px]
        bg-gray-100 dark:bg-[#28292d] z-[10] flex flex-col py-[50px] px-[40px]
        '
            onSubmit={handleSubmit}
          >
            <h2 className='text-red-main text-2xl font-[500] text-center mb-3 tracking-[0.1em]'>
              Sign Up
            </h2>
  
            <div className='relative z-9 w-full mb-6 group'>
              <input
                className='peer'
                id='name'
                placeholder=' '
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor='name'>First Name</label>
            </div>
  
            <div className='relative z-9 w-full mb-6 group'>
              <input
                className='peer'
                id='last_name'
                placeholder=' '
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor='last_name'>Last Name</label>
            </div>
            <div className='relative z-9 w-full mb-6 group'>
              <input
                className='peer'
                id='email'
                placeholder=' '
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='email'>Email</label>
            </div>
  
            <div className='relative z-0 w-full mb-6 group'>
              <input
                className='peer'
                id='password'
                placeholder=' '
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
  
            <button className='btn-danger cursor-pointer' type='submit'>
              Register
            </button>
            <button
              className='btn-danger flex justify-between items-center cursor-pointer'
              onClick={() => signUpProvider()}
            >
              <span> Continue with Google</span>
              <FcGoogle className='text-3xl' />
            </button>
          </form>
        </div>
      </div>
    )
  }
    
