import React, { useEffect, useState } from 'react'
import Icons from './Icons'

const CheckDropdown = (
    { 
        options = ['test1', 'test2'], 
        title = 'status', 
        setValue,
        setErr ,
        preSet = null,
    }) => {

    useEffect(()=>{

      
        if(preSet){
            setValue(preSet);
            setSelectedOption(preSet)
        }
        if(preSet === true) {
            setValue('Yes')
            setSelectedOption('Yes')
        };
        if(preSet === false) {
            setValue('No')
            setSelectedOption('No')
        }
    },[preSet])

    const [selectedOption, setSelectedOption] = useState(null)
    const [isGreen, setIsGreen] = useState(false)
    return (
        <div className=''>
            <div className="dropdown">
                <div className='flex flex-row items-center'>
                    <Icons iconName={'dot'} size='4xl' color={isGreen ? `text-green-500` : `text-red-500`} />

                    <div className='flex items-center gap-2 border p-3 w-full border-stone-700 rounded-lg'>
                        <h1 className='text-xs tracking-widest text-blue-300'>{title}</h1>
                        <div tabIndex={0} role="button" className="mx-9 flex items-center gap-1  bg-zinc-700 text-zinc-100 rounded-md px-1">
                            {
                                selectedOption ? selectedOption : 'select here'
                            }
                            <Icons iconName={'dropdownArrow'} size='xl' /> </div>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content  bg-zinc-800 rounded-md  z-[1] w-52 p-2 shadow max-h-60 overflow-auto flex flex-col  ">
                    {
                        options && options.map((o, oi) => {
                            return (
                                <div key={o}
                                    onClick={() => {
                                        setSelectedOption(o)
                                        setValue(o)
                                        setIsGreen(true)
                                        setErr(null)
                                    }}
                                    className='flex cursor-pointer hover:bg-zinc-600 duration-200 flex-row my-1 items-center w-full  bg-zinc-700 p-1 rounded-md'>
                                    {
                                        selectedOption === o ? <Icons iconName={'checkBox'} size='xl' /> : <Icons iconName={'unCheckBox'} size='xl' />
                                    }

                                    <h1>{o}</h1>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default CheckDropdown
