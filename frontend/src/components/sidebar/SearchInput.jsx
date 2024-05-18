import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className='flex items-center gap-4'>
        <input type='text' placeholder='Search' className='input input-bordered rounded-full text-lg px-7 py-2'/>
        <button type='submit' className='btn btn-circle bg-teal-600 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none'/>
        </button>
    </form>
  );
};

export default SearchInput;