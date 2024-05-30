import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-lg bg-white backdrop-blur-lg bg-opacity-80'>
      <h1 className='text-4xl font-semibold text-center text-gray-800'>WebChat Login</h1>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black' > Username</span>
          </label>
          <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black' > Password</span>
          </label>
          <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* User doesn't have account (a is substitute for link)*/}
        <Link to={'/signup'} className='text-gray-600 hover:text-blue-600 mt-2 inline-block'>
          {"Don't"} have an account?
        </Link>

        {/* Button */}
        <div>
          <button className='btn btn-block py-3 px-6 text-lg bg-blue-500 hover:bg-blue-600 text-white mt-3'
            disabled={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Sign in"}</button>
        </div>
      </form>
    </div>
  </div>
}

export default Login