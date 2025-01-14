import React, { useEffect, useState } from 'react'
import { getMonthNum, getMonthsWithDays, monthsName } from '../constants/calender'
import moment from 'moment'
import Icons from './Icons';


const Calender = ({ preSet=null, setValue, titlle = 'Birth Date', setErr }) => {
    const [isGreen, setIsGreen] = useState(false)
    const [tenYears, setTenYears] = useState(Array.from({ length: 10 }, (_, i) => i + Number(moment(new Date()).format('YYYY'))))
    const [modifying, setModifying] = useState(false)

    const [date, setDate] = useState(
        {
            day: null,
            month: null,
            year: null,
        }
    )

    useEffect(() => {
        if(preSet && !modifying){
            // console.log('2 preSet in calender: ', preSet)

            setValue(preSet)
        }else{
            // console.log('else part')
            date.day && (setValue && setValue(`${date.year}-${getMonthNum(date.month)}-${date.day.toString().length > 1 ? date.day : `0${date.day}`}`))
        }
      
    }, [date.day])

    useEffect(()=>{
        // console.log('preSet in calender: ', preSet)
        if( preSet){
            
          
            setDate({
                year: preSet.split('-')[0],
                month: `${moment(preSet).format('MMMM')}`,
                day: preSet.split('-')[2],
            });
       
        }

    },[preSet])

    return (
        <div>

            <div className='flex items-center'>
                <Icons iconName={'dot'} size='4xl' color={isGreen ? `text-green-500` : 'text-red-500'} />
                <div className='flex  gap-2 items-center border border-stone-700 rounded-lg  p-2 '>


                    <h1 className='text-xs tracking-widest text-blue-300'>{titlle}</h1>
                    {
                        date?.year &&
                        <div className='flex flex-row gap-2 border py-1 text-sm px-1 border-zinc-300 rounded-md'>
                            {date?.day && <span> {date.day}</span>}
                            {date?.month && <span> {date.month},</span>}
                            {date?.year && <span> {date.year}</span>}


                        </div>
                    }
                    <button onClick={() => {
                        setIsGreen(false)
                        setDate({
                            day: null,
                            month: null,
                            year: null,
                        })
                    }} className='btn btn-active btn-xs rounded-md hover:text-white btn-warning tracking-widest uppercase'> reset
                    </button>
                </div>
            </div>

            {
                !date?.year && <div className=' flex flex-row flex-wrap max-w-80 gap-3 rounded-lg bg-zinc-600 p-2'>
                    <button
                        onClick={() => {
                            setTenYears(Array.from({ length: 10 }, (_, i) => (tenYears[0] - 10) + (i + 1)))
                        }}
                        className='mr-5 btn btn-active btn-sm rounded-md hover:text-blue-500 btn-neutral'>
                        <Icons iconName={'leftArrow'} size='xl' />
                    </button>

                    {tenYears.map((y, yi) => {
                        return (
                            <button key={yi} onClick={() => setDate({ ...date, year: y })} className='btn btn-active btn-sm rounded-md hover:text-blue-500 btn-neutral'>{y} </button>
                        )
                    })}

                    <button
                        onClick={() => {
                            setTenYears(Array.from({ length: 10 }, (_, i) => (tenYears[9]) + (i + 1)))
                        }}
                        className='ml-5 btn btn-active btn-sm rounded-md hover:text-blue-500 btn-neutral'>
                        <Icons iconName={'rightArrow'} size='xl' />
                    </button>


                </div>
            }

            {
                !date?.month && (date?.year &&
                    <div>

                        <div className='flex flex-row flex-wrap max-w-80 gap-3 rounded-lg bg-zinc-600 p-2'>
                            {
                                monthsName.map((m, mi) => {
                                    return (
                                        <button key={mi} onClick={() => setDate({ ...date, month: m })} className='tracking-widest btn btn-active btn-sm rounded-md hover:text-blue-500 btn-neutral'>{m} </button>
                                    )
                                })
                            }
                        </div>

                    </div>)
            }

            {
                !date?.day && (date?.month &&
                    <div  >

                        <div className='flex flex-row flex-wrap max-w-80 gap-2 rounded-lg bg-zinc-600 p-2'>
                            {
                                getMonthsWithDays(date?.year)[date?.month].map((d, di) => {
                                    return (
                                        <button key={di}
                                            onClick={() => {
                                                setErr(null)
                                                setDate({ ...date, day: d })
                                                setIsGreen(true)
                                                setModifying(true)

                                            }}
                                            className='btn btn-active btn-xs rounded-md hover:text-blue-500 btn-neutral'>{d} </button>
                                    )
                                })
                            }
                        </div>

                    </div>)
            }



        </div>
    )
}

export default Calender
