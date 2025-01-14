import React from 'react'
import { TbError404 } from "react-icons/tb";


const PageNotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <TbError404 className='text-6xl' />
        <h1 className='tracking-widest'>Page not found</h1>
      
    </div>
  )
}

export default PageNotFound
