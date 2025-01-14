import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EventForm from '../components/eventComponents/EventForm';
import usePost from '../hooks/usePost';
import { toast } from 'sonner';
import Loading from '../components/Loading';

const EditEvent = () => {
  const location = useLocation()
  const event = location.state;
  const navigate = useNavigate()
  const [newEvent, setNewEvent] = useState(null)

  const { post, data, loading, err } = usePost('/api/event/editevent')


  // console.log('oldEvent',event)
  console.log('newEvent', newEvent)
  useEffect(() => {
    if (newEvent) {
      post(newEvent)
    }

  }, [newEvent])

  useEffect(() => {
    if (data) {
      console.log(data)
      toast.success('updated successfully')
      navigate(`/eventdetails/${data._id}`)
    }
  }, [data])

  if(loading)
    return <Loading/>

  return (
    <div>
      <h1 className='text-center mt-5 font-extrabold text-2xl m'>Edit your event</h1>

      <EventForm preBuilt={event} setValue={setNewEvent} />

    </div>
  )
}

export default EditEvent
