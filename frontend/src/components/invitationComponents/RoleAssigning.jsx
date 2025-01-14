import React, { useEffect, useState } from 'react'
import Icons from '../Icons'

const RoleAssigning = ({ selectedUser, handleSendInvitation }) => {

    const [usersRole, setUsersRole] = useState([])

    const handleRole = (id, role) => {
        console.log(id, role)
        let temp = usersRole.map(u => {
            if (u.id === id) {
                return { ...u, role }
            } else {
                return u
            }
        })
        setUsersRole(temp)

    }
    useEffect(() => {
        if (selectedUser.length > 0) {
            let temp = []
            selectedUser.map(u => {
                temp.push(
                    {
                        id: u._id,
                        email: u.email,
                        role: 'guest',
                    }
                )
            })
            setUsersRole(temp)
        }

    }, [selectedUser])
    console.log(usersRole)

     
    return (
        <div className='my-10'>
        
            <div className=''>
                <div className='flex flex-row justify-between px-5'>
                    <h1 className='text-xs  uppercase '>email</h1>
                    <div className='flex  gap-12'>
                        <h1 className='text-xs text-yellow-400 uppercase '> </h1>
                        <h1 className='text-xs   uppercase '>Role assign</h1>
                        <h1 className='text-xs text-orange-400 uppercase '> </h1>
                    </div>
                </div>

                <div >
                    {
                        usersRole &&
                        usersRole.map(u => {
                            return (
                                <div className='my-3 bg-zinc-800  rounded-lg flex flex-col md:flex-row justify-between flex-wrap py-2 px-5'>
                                 
                                    <h1 className=' text-sm tracking-widest'>({u.email})</h1>

                                    <div className='flex  mx-auto md:m-0    gap-8'>
                                        <button onClick={() => handleRole(u.id, 'admin')} className='text-xs text-yellow-400 uppercase '>
                                            {
                                                u.role === 'admin' ? <span className='flex items-center '>
                                                    <Icons iconName={'tick'} size='xl' />
                                                    {u.role}</span> : <span className='flex items-center opacity-20 '>
                                                    ADMIN   </span>
                                                    // <Icons iconName={'unCheckBox'} size='4xl' />
                                            }
                                        </button>

                                        <button onClick={() => handleRole(u.id, 'host')} className='text-xs text-blue-400 uppercase '>
                                            {
                                                u.role === 'host' ? <span className='flex items-center '>
                                                    <Icons iconName={'tick'} size='xl' />
                                                    {u.role}</span> : <span className='flex items-center opacity-20 '>
                                                    HOST   </span>
                                                    
                                                    // <Icons iconName={'unCheckBox'} size='4xl' />
                                            }
                                        </button>

                                        <button onClick={() => handleRole(u.id, 'guest')} className='text-xs text-orange-400 uppercase '>
                                            {
                                                u.role === 'guest' ? <span className='flex items-center '>
                                                    <Icons iconName={'tick'} size='xl' />
                                                    {u.role}</span> 
                                                    :  <span className='flex items-center opacity-20 '>
                                                             GUEST   </span>
                                                    // <Icons iconName={'unCheckBox'} size='4xl' />
                                            }
                                        </button>
                                    </div>





                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {
                 
                <div className='flex my-20 flex-row justify-center '>
                    <button onClick={()=>handleSendInvitation(usersRole)} className='btn btn-info md:w-1/2 uppercase rounded-lg text-white tracking-widest btn-sm'>
                        <Icons iconName={'plane'} color='text-white' size='2xl' />
                        send invitation
                    </button>
                </div>
            }

        </div>
    )
}

export default RoleAssigning
