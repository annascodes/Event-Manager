import React, { useEffect, useState } from 'react'
import Icons from './Icons';

const ImgsShowCase = ({imgs=[
    'https://images.pexels.com/photos/303066/pexels-photo-303066.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/29884794/pexels-photo-29884794/free-photo-of-street-scene-in-taipei-with-people-and-signs.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/186537/pexels-photo-186537.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/14180113/pexels-photo-14180113.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    'https://images.pexels.com/photos/20773220/pexels-photo-20773220/free-photo-of-advertisements-on-building-wall-at-night.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
] , title='dummy title'}) => {

   
     
    const [count, setCount] = useState(0)
    const [onDisplay, setOnDisplay] = useState([imgs[count]])
    const handleOnDisplay = (value) => {
                  
        if (count + value >= 0 && count + value <= imgs.length) {
            console.log('B')
            setOnDisplay(imgs[count + value])
            setCount(count + value)
        }
        
        if(count + value === imgs.length){
            console.log('C')
            setOnDisplay(imgs[0])
            setCount(0)
        }

        if(count+value < 0){
            console.log('D')
            setOnDisplay(imgs[imgs.length-1])
            setCount(imgs.length-1)

        }

    }
        // useEffect(()=>{
        //     const interval = setInterval(() => {
        //         handleOnDisplay(1)
        //     }, (1000));

        //     return ()=>clearInterval(interval)
        // },[imgs.length])
    return (
        <div className='my-10'>

            <div className='relative  w-full h-96 overflow-hidden rounded-xl mx-auto'>
                {
                    imgs.length>0 ?
                    <img src={onDisplay} className='w-full h-full opacity-60 object-cover' alt="" />:
                    <div className='w-full h-full opacity-60 rounded-xl object-cover bg-zinc-800 border-2 border-zinc-500 flex flex-row items-end justify-center py-5'>
                        <span className='opacity-50 text-xs tracking-widest'>(no image for this event yet)</span>

                    </div>
                }

              

                {
                    imgs.length>1 &&
                    <div className='absolute top-1/2 z-30 px-2 w-full  flex items-center justify-between text-white'>
                    <button onClick={() => handleOnDisplay(-1)} className='btn btn-xs btn-outline rounded-md '>  <Icons iconName={'leftArrow'}  /></button>
                    <button onClick={() => handleOnDisplay(1)} className='btn btn-xs btn-outline rounded-md '>  <Icons iconName={'rightArrow'}   /></button>

                </div>
                }

                <div className='absolute top-0 px-2 w-full  flex items-center justify-center gap-0 text-white'>
                    {/* {count+1 } / {imgs.length} */}
                    {
                        [...Array(imgs.length)].map((_,i)=>{
                            return(
                                <Icons iconName={'dot'} size='2xl' color={`${count === i && 'text-yellow-400'}  `} />
                                
                            )
                        })
                    }
                </div>

                <h1 className='absolute py-5  md:text-4xl font-extrabold text-white px-16 top-0 w-full h-full flex flex-row justify-center items-center '>
                    <h1 className=' text-center'>
                        {title}
                    </h1>
                </h1>
            </div>

        </div>
    )
}

export default ImgsShowCase
