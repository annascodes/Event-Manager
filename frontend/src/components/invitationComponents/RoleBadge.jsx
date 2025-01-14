import React from 'react'
import Icons from '../Icons'

const RoleBadge = ({role}) => {
  return (
    <div>
        {
            role === 'admin' && 
           <h1 className=' bg-red-300 text-red-800 flex flex-row gap-1 items-center text-sm px-1 rounded-md uppercase tracking-widest'>
            <Icons iconName={'admin'} size='xl' />
            admin
           </h1>
        }
        {
            role === 'host' && 
           <h1 className=' bg-orange-300 text-orange-800 flex flex-row gap-1 items-center text-sm px-1 rounded-md uppercase tracking-widest'>
              <Icons iconName={'cards'} size='xl' />
            host
           </h1>
        }
        {
            role === 'guest' && 
           <h1 className=' bg-green-300 text-green-800 flex flex-row gap-1 items-center text-sm px-1 rounded-md uppercase tracking-widest'>
              <Icons iconName={'threePeople'} size='xl' />
            guest
           </h1>
        }
       
      
    </div>
  )
}

export default RoleBadge
