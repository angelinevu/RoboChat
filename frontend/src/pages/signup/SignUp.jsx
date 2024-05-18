import React from 'react'

const SignUp = () => {
  return <div className= 'flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-lg bg-white backdrop-blur-lg bg-opacity-80'>
      <h1 className='text-4xl font-semibold text-center text-gray-800'>Sign Up</h1>

      <form>
        {/* Full Name */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Full Name</span>
          </label>
          <input type='text' placeholder='e.g. John Doe' className='w-full input input-bordered h-10' />
        </div>

        {/* Username */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Username</span>
          </label>
          <input type='text' placeholder='Enter password' className='w-full input input-bordered h-10' />
        </div>

      {/* Password */}
        <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Password</span>
          </label>
          <input type='text' placeholder='Enter Password' className='w-full input input-bordered h-10' />
        </div>

      {/* Confirm Password */}
      <div>
          <label className='label p-2'>
            <span className='text-case label-text text-black'>Confirm Password</span>
          </label>
          <input type='text' placeholder='Confirm Password' className='w-full input input-bordered h-10' />
        </div>

      {/* Already have an account*/}
      <a className='text-gray-600 hover:text-blue-600 mt-2 inline-block' href='m'>
          Already have an account?
        </a>
      {/* Button */}
      <div>
        <button className='btn btn-block py-3 px-6 text-lg bg-teal-600 hover:bg-blue-700 text-white mt-3'>Sign Up</button>
        </div>

      </form>
    </div>
  </div>
}

export default SignUp