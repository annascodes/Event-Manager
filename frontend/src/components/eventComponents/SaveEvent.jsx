import React, { useEffect, useState } from 'react'
import Icons from '../Icons'
import { useDispatch, useSelector } from 'react-redux'
import usePost from '../../hooks/usePost'
import { signedIn } from '../../redux/user/userSlice'
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";


const SaveEvent = ({ id }) => {
    const { currentUser } = useSelector(state => state.user)
    const [btn, setBtn] = useState(currentUser?.savedEvents.includes(id) ? 'unsave' : 'save')
    const [saving, setSaving] = useState(null)
    const dispatch = useDispatch()
    const { post, data, loading, err } = usePost('/api/event/saveevent')
    const handleSavingEvent = () => {
        console.log('gonna save this event: ', id)
        setSaving(id)
        post({ eventId: id })
    }
    useEffect(() => {
        if (data) {
            dispatch(signedIn(data))
        }

    }, [data])

    return (
        <div>
            {
                (saving === id && loading) ?
                    <span className='loading loading-spinner loading-sm'></span>
                    :
                    <button onClick={handleSavingEvent} className='hover:text-red-400 duration-200'>
                        {
                            currentUser?.savedEvents.includes(id) ?
                                <div className='flex items-center gap-1 tracking-widest text-red-500 text-xl'>
                                    <IoBookmark />

                                </div>
                                :
                                <div className='flex items-center gap-1 tracking-widest text-xl '>
                                    <IoBookmarkOutline />
                                </div>
                        }

                    </button>
            }


        </div>
    )
}

export default SaveEvent
