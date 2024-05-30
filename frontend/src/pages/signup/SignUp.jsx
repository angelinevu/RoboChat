import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const { loading, signup } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs)
  }

  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-lg bg-white backdrop-blur-lg bg-opacity-80'>
      <h1 className='text-4xl font-semibold text-center text-gray-800'>WebChat Sign Up</h1>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Full Name</span>
          </label>
          <input type='text' placeholder='e.g. John Doe' className='w-full input input-bordered h-10'
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </div>

        {/* Username */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Username</span>
          </label>
          <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10'
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        {/* Password */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Password</span>
          </label>
          <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Confirm Password</span>
          </label>
          <input type='password' placeholder='Confirm Password' className='w-full input input-bordered h-10'
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          />
        </div>

        {/* Already have an account */}
        <Link to={'/login'} className='text-gray-600 hover:text-blue-600 mt-2 inline-block' href='m'>
          Already have an account?
        </Link>
        {/* Button */}
        <div>
          <button className='btn btn-block py-3 px-6 text-lg bg-blue-500 hover:bg-blue-600 text-white mt-3'
            disabled={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  </div>
}

export default SignUp