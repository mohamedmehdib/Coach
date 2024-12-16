import React from 'react'

export default function Loading() {
  return (
    <div className='bg-gray-300 text-zinc-600 h-screen duration-500 flex justify-center items-center'>
        <div className='text-5xl animate-spin w-fit'>
            <i className="uil uil-spin"></i>
        </div>
    </div>
  )
}
