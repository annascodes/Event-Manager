import React, { useEffect, useState } from 'react'

const Button = ({ onclick, outline = '', type = '', btnName = '', size = 'btn-md', text='' }) => {
   

    // size: xs, sm, md, lg
    // type: neutral, primary, etc
    return (
        <>
           
            <button onClick={onclick} className={`hover:scale-105 duration-300 tracking-widest uppercase rounded-lg btn max-w-56 mx-auto ${size} ${text} btn-outline ${type}`}>{btnName}</button>

        </>
    )
}

export default Button
