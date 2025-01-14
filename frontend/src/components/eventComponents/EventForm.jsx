import React, { useEffect, useState } from 'react'
import InputTag from '../InputTag'
import CheckDropdown from '../CheckDropdown'
import Icons from '../Icons'
import Calender from '../Calender'
import Error from '../Error'
import SelectEventImgs from './SelectEventImgs'

const EventForm = ({ preBuilt = null, setValue, btnTitle='next' }) => {
    const [name, setName] = useState(null)
    const [desc, setDesc] = useState(null)
    const [isPublic, setIsPublic] = useState(null)
    const [status, setStatus] = useState(null)
    const [timeStart, setTimeStart] = useState(null)
    const [timeEnd, setTimeEnd] = useState(null)
    const [venue, setVenue] = useState(null)
    const [capacity, setCapacity] = useState(null)
    const [price, setPrice] = useState(null)
    const [city, setCity] = useState(null)
    const [imgs, setImgs] = useState([])
    const [removeImgs, setRemoveImgs] = useState([])

    const [registrationEndDate, setResgistrationEndDate] = useState(null)
    const [err, setErr] = useState(null)

    const handleCreateEvent = async () => {
        console.log('tempEvent:', {
            registrationEndDate,
            name,
            desc,
            isPublic,
            status,
            timeStart,
            timeEnd,
            venue,
            capacity,
            price,
            city
        })
        if (!name || !desc || !isPublic || !status || !timeStart || !timeEnd || !venue || !price || !capacity || !city || !registrationEndDate)
            return setErr('All fields are required')

        setValue(
            {
                id: preBuilt && preBuilt._id,
                registrationEndDate,
                name,
                desc,
                isPublic: isPublic === "Yes" ? true : false,
                status,
                timeStart,
                timeEnd,
                venue,
                capacity,
                price,
                city,
                imgs,
                removeImgs
            }
        )
    }



    return (
        <div className='p-5'>
            <h1 className=' mb-2 text-center text-xs tracking-widest uppercase opacity-40'>Fill the fields</h1>

            <div className='md:w-1/2 mx-auto flex flex-col gap-5 '>

                <InputTag preSet={preBuilt?.name ? preBuilt.name : null} fieldName={'name'} setValue={setName} type='text' size='md' setErr={setErr} />

                <InputTag preSet={preBuilt?.desc ? preBuilt.desc : null} fieldName={'desc'} setValue={setDesc} type='text' size='md' setErr={setErr} />

                <InputTag preSet={preBuilt?.venue ? preBuilt.venue : null} fieldName={'venue'} setValue={setVenue} type='text' size='md' setErr={setErr} />

                <InputTag preSet={preBuilt?.capacity ? preBuilt.capacity : null} fieldName={'capacity'} setValue={setCapacity} type='number' size='md' setErr={setErr} />

                <InputTag preSet={preBuilt?.price ? preBuilt.price : null} fieldName={'price'} setValue={setPrice} type='number' size='md' setErr={setErr} />

                <InputTag preSet={preBuilt?.city ? preBuilt.city : null} fieldName={'city'} setValue={setCity} type='text' size='md' setErr={setErr} />

                <div className='flex flex-row flex-wrap gap-3'>

                    <CheckDropdown preSet={preBuilt?.status ? preBuilt.status : null} title='status' options={['Registraion Open', 'Registraion Close', 'Ongoing', 'Past', 'Cancelled']} setValue={setStatus} setErr={setErr} />

                    <CheckDropdown
                        preSet={preBuilt?.isPublic ? preBuilt.isPublic : null}
                        title='isPublic'
                        options={['Yes', 'No']}
                        setValue={setIsPublic}
                        setErr={setErr} />

                    <CheckDropdown
                        preSet={preBuilt?.timeStart ? preBuilt.timeStart : null}
                        title='Start at'
                        options={Array.from({ length: 24 }, (_, i) => `${i + 1}:00`)} setValue={setTimeStart}
                        setErr={setErr} />

                    <CheckDropdown
                        preSet={preBuilt?.timeEnd ? preBuilt.timeEnd : null}
                        title='Ends at'
                        options={Array.from({ length: 24 }, (_, i) => `${i + 1}:00`)} setValue={setTimeEnd}
                        setErr={setErr}
                    />
                </div>



                <Calender preSet={preBuilt?.registrationEndDate ? preBuilt.registrationEndDate : null} titlle='Registraion end date' setValue={setResgistrationEndDate} setErr={setErr} />

{/* 
                <div className='flex flex-wrap justify-center  gap-2'>
                    {
                        removeImgs.length > 0 && removeImgs.map((i, indx) => {
                            return (
                                <div className='flex w-32 h-32 overflow-hidden flex-col justify-center items-center bg-zinc-700 rounded-lg'>
                                    <img src={i} className='w-full h-full object-cover rounded-t-lg' alt="" />
                                    <button className='btn m-0.5 btn-xs btn-outline rounded-md'>put it back</button>
                                </div>
                            )
                        })
                    }
                </div> */}


                <div className='flex flex-wrap justify-center  gap-2'>
                    {
                        preBuilt && preBuilt.imgs.map((i, indx) => {
                            return (
                                <div key={indx} className={`  flex w-32 h-32 overflow-hidden flex-col justify-center items-center bg-zinc-700 rounded-lg`}>
                                    <img src={i}
                                        className={`${removeImgs.includes(i) && 'opacity-20'} w-full h-full object-cover rounded-t-lg`} alt="" />

                                    {
                                        removeImgs.includes(i) ?
                                            <button
                                                onClick={() => {
                                                    setRemoveImgs(removeImgs.filter(img=>img!==i))
                                                }}
                                                className='btn m-0.5 btn-xs btn-outline rounded-md'>put it back</button>
                                            :
                                            <button
                                                onClick={() => {
                                                    setRemoveImgs([...removeImgs, i])
                                                }}
                                                className='btn m-0.5 btn-xs btn-outline rounded-md'>remove it</button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                <SelectEventImgs imgs={imgs} setImgs={setImgs} />




                {
                    err && <Error msg={err} />
                }

                <button
                    onClick={handleCreateEvent}
                    className='btn rounded-lg tracking-widest uppercase  btn-info'>
                    <Icons iconName={'idCard'} size='2xl' />
                    {btnTitle}</button>


            </div>


        </div>
    )
}

export default EventForm

