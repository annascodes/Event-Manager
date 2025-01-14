import React from 'react'
import Icons from './Icons'
import { Link, useNavigate } from 'react-router-dom'

const DropdownMenu = ({list=[{name:'list1',handle:null, arg:null, link:null, icon:'smallCircle'}], title=null, icon='dropdownArrow' }) => {
    const naviate = useNavigate()
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="hover:bg-zinc-800 rounded-md duration-200  p-1 flex items-center gap-0">
                { title && <h1>{title}</h1> }
                <Icons iconName={icon} size='2xl' />

            </div>
            <ul tabIndex={0} className="dropdown-content border-0 border-zinc-500 menu  rounded-lg z-[1] w-52 p-2 shadow bg-zinc-800">
               {
                list.map((l,li)=>{
                    return(
                        <Link key={li} onClick={(e)=>{
                            e.preventDefault()

                            if(l.link){
                               naviate(l.link)
                            }else{
                                l.handle(l.arg)
                            }
                        }} to={`${l.link}`} className='flex hover:bg-zinc-700 duration-200 rounded-md  items-center gap-2 px-2 py-1  ' >
                            <Icons iconName={l.icon || 'dot'} size='xl' />
                            <h1 className='text-xs tracking-widest'>{l.name.toUpperCase()} </h1>
                        </Link>
                    )
                })
               }
            </ul>
        </div>
    )
}

export default DropdownMenu
