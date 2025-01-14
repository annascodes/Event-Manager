import React, { useEffect, useState } from 'react'
import EventForm from '../components/eventComponents/EventForm'
import usePost from '../hooks/usePost'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const MakeEvent = () => {
    const [event, setEvent] = useState(null)
    console.log(event)
    const navigate = useNavigate()

    const { post, data, loading, err } = usePost('/api/event/createsingleevent');

    useEffect(() => {
        if (event) {
            post(event)
        }
    }, [event])

    useEffect(() => {
        if (data) {
            console.log(data)
            toast.success('Event has created')
            navigate('/testevent/testbyme')
            
        }

    }, [data])
    if(loading)
        return <Loading />
    return (
        <div>
           <h1 className='text-4xl font-extrabold text-center mt-5'> Make event here</h1>
            <EventForm setValue={setEvent} />

        </div>
    )
}

export default MakeEvent
