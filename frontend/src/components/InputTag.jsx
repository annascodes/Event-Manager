import React, { useEffect, useState } from 'react'
import Icons from './Icons'

const InputTag = ({ preSet=null, fieldName, setValue, type='text', size='',setErr }) => {
    const [isGreen, setIsGreen] = useState(false)
    // console.log(preSet)

    useEffect(()=>{
        if(preSet) setValue(preSet)
    },[preSet])
    return (
        <div className='flex flex-row items-center'>
             <Icons iconName={'dot'} size='4xl' color={isGreen ? `text-green-500`: `text-red-500`} />
            <label className={`input input-${size} w-full rounded-lg input-bordered flex items-center gap-2`}>
                <span className='text-xs tracking-widest text-blue-300 flex flex-row items-center gap-1 '> 
                   
                    {fieldName}</span>
                <input onChange={(e)=>{
                    setValue(e.target.value)
                    if(setErr){
                        setErr(null)

                    }

                    setIsGreen(true)
                }} type={`${type}`} className="grow" defaultValue={preSet? preSet : null} placeholder="" />
            </label>
        </div>
    )
}

export default InputTag
