import React from 'react'

const Loading = ({type='loading-dots', size='loading-md'}) => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <span className={`loading ${type} ${size}`}></span>
      
    </div>
  )
}

export default Loading
