import React, { useState } from 'react'
import Icons from './Icons'

const SortBy = ({ options = ['apple', 'banana', 'cherry', 'dates'], setValu, title=null }) => {

    const [sortBy, setSortBy] = useState(options ? options[0] : null)
    const handleSortBy = (value) => {
        setSortBy(value)
        if(setValu)
            setValu(value)
    }

    return (
        <div>

            <div className='flex flex-wrap items-center gap-4 my-5'>
                <h1 className='tracking-widest text-sm text-yellow-300 '>{title} </h1>
                {
                    options.length > 0 && options.map((o, oi) => {
                        return (
                            <h1 key={oi} onClick={() => handleSortBy(o)} className={`${sortBy === o && 'bg-white text-black'} border-white cursor-pointer hover:bg-white text-sm hover:text-black  p-0.5   font-light tracking-widest flex items-center gap-1 `}>
                                { sortBy === o && <Icons iconName={'tick'} size='xl' />}
                                {o}
                            </h1>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default SortBy
