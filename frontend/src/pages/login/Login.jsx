import React from 'react'

const Login = () => {
  return <div className= 'flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-lg bg-white backdrop-blur-lg bg-opacity-80'>
      <h1 className='text-4xl font-semibold text-center text-gray-800'>Login</h1>
      <form>
        {/* Username */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black' > Username</span>
          </label>
          <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
        </div>
        {/* Password */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black' > Password</span>
          </label>
          <input type='text' placeholder='Enter password' className='w-full input input-bordered h-10' />
        </div>
        {/* User doesn't have account (a is substitute for link)*/}
        <a href='a' className='text-gray-600 hover:text-blue-600 mt-2 inline-block'>
          {"Don't"} have an account?
        </a>
        {/* Button */}
        <div>
        <button className='btn btn-block py-3 px-6 text-lg bg-teal-600 hover:bg-blue-700 text-white mt-3'>Sign in</button>
        </div>

      </form>
    </div>
  </div>
}

export default Login