import React, { useEffect, useState } from 'react'
import InputTag from '../components/InputTag'
import CheckDropdown from '../components/CheckDropdown'
import Icons from '../components/Icons'
import Calender from '../components/Calender'
import Error from '../components/Error'
import usePost from '../hooks/usePost'

const CreateEvent = () => {
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
    
    const [registrationEndDate, setResgistrationEndDate] = useState(null)

    const [err, setErr] = useState(null)

    const { post, data, loading, err: createEventErr } = usePost('/api/event/createsingleevent')

    const handleCreateEvent = async () => {
        if (!name || !desc || !isPublic || !status || !timeStart || !timeEnd || !venue || !price || !capacity || !city || !registrationEndDate)
            return setErr('All fields are required')
        console.log(
            {
                resgistrationEndDate: registrationEndDate,
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
            }
        )

        post({ name, desc, isPublic, status, timeStart, timeEnd, venue, price, capacity, city,  registrationEndDate })

    }

    useEffect(() => {
        if (data)
            console.log(data)

    }, [data])

    useEffect(() => {
        if (createEventErr) setErr(createEventErr)
    }, [createEventErr])

    return (
        <div className='p-5'>
            <h1 className='text-xl mb-2 text-center'>Create event</h1>
            <div className='md:w-1/2 mx-auto flex flex-col gap-5 '>
                <InputTag fieldName={'name'} setValue={setName} type='text' size='md' setErr={setErr} />
                <InputTag fieldName={'desc'} setValue={setDesc} type='text' size='md' setErr={setErr} />
                <InputTag fieldName={'venue'} setValue={setVenue} type='text' size='md' setErr={setErr} />
                <InputTag fieldName={'capacity'} setValue={setCapacity} type='number' size='md' setErr={setErr} />
                <InputTag fieldName={'price'} setValue={setPrice} type='number' size='md' setErr={setErr} />
                <InputTag fieldName={'city'} setValue={setCity} type='text' size='md' setErr={setErr} />

                <div className='flex flex-row flex-wrap gap-3'>

                    <CheckDropdown title='status' options={['Registraion Open', 'Registraion Close', 'Ongoing', 'Past', 'Cancelled']} setValue={setStatus} setErr={setErr} />

                    <CheckDropdown
                        title='isPublic'
                        options={['Yes', 'No']}
                        setValue={setIsPublic}
                        setErr={setErr} />

                    <CheckDropdown
                        title='Start at'
                        options={Array.from({ length: 24 }, (_, i) => `${i + 1}:00`)} setValue={setTimeStart}
                        setErr={setErr} />

                    <CheckDropdown
                        title='Ends at'
                        options={Array.from({ length: 24 }, (_, i) => `${i + 1}:00`)} setValue={setTimeEnd}
                        setErr={setErr}
                    />
                </div>



                <Calender setValue={setResgistrationEndDate} setErr={setErr} />

                {
                    err && <Error msg={err} />
                }


                <button
                    onClick={handleCreateEvent}
                    className='btn rounded-lg tracking-widest uppercase  btn-info'>
                    <Icons iconName={'idCard'} size='2xl' />
                    Create</button>


            </div>


        </div>
    )
}

export default CreateEvent

 