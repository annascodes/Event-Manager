import React, { useEffect, useState } from 'react'
import Icons from '../Icons'
import { useNavigate } from 'react-router-dom'
import usePost from '../../hooks/usePost'
import { toast } from 'sonner'

const BuyTicketModal = ({ event }) => {
    const [count, setCount] = useState(1)
    const navigate = useNavigate()
    const { post: createTicket, data: createTicketData, loading: createTicketLoading, err: createTicketErr } = usePost('/api/ticket/createticket')

    const handleCount = (value) => {
        if (count + value !== -1)
            setCount(count + value)
    }
    const handleGetYourTicket = () => {
        // navigate('/getticket', {state:{
        //     event,
        //     count
        // }})
        createTicket({ event: event._id, count })

    }
    useEffect(() => {
        if (createTicketData) {
            console.log(createTicketData)
            toast.success('Tickets generated')
            navigate('/tickets')
        }


    }, [createTicketData])

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <button
                // disabled={!event.isPublic}
                onClick={() => document.getElementById(`${event._id}-buyingTicket`).showModal()}
                className='btn btn-sm btn-outline rounded-lg border-2'>Buy ticket</button>

            {/* <button className="btn" >open modal</button> */}
            <dialog id={`${event._id}-buyingTicket`} className="modal">
                <div className="modal-box w-11/12 py-1  px-2 max-w-5xl">
                    <div className="modal-action   p-0 m-0 flex items-center justify-between">
                        <h3 className="flex gap-2 items-center font-bold text-lg">

                            <span className='text-red-400 tracking-widest text-sm'>(booking will be close in 2 days)</span>
                        </h3>

                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="p-2 hover:bg-zinc-700 rounded-md duration-200">
                                <Icons iconName={'close'} size='xl' />
                            </button>
                        </form>
                    </div>


                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th>Event</th>
                                    <th className='text-center'>Tickets</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>

                                    <td>{event.name}</td>
                                    <td className=' rounded-2xl flex items-center justify-between'>
                                        <button

                                            onClick={() => handleCount(1)} className='hover:bg-zinc-700 p-1 rounded-md' >
                                            <Icons iconName={'plus'} />
                                        </button>
                                        <span className='text-yellow-200 text-xl tracking-widest'>{count} </span>
                                        <button

                                            onClick={() => handleCount(-1)}
                                            className='hover:bg-zinc-700 p-1 rounded-md'  >
                                            <Icons iconName={'minus'} />
                                        </button>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 justify-around my-16'>
                        <h1>Your total will be</h1>
                        <div className='flex items-center gap-2 text-xs tracking-widest'>
                            (
                            <h1>{count > 1 ? `${count} tickets` : `${count} ticket`} </h1>
                            <Icons iconName={'close'} size='xs' />
                            <h1>Rs {event.price}/- </h1>
                            {/* <Icons iconName={'equals'} size='xs' /> */}
                            )
                        </div>
                        <h1 className='bg-zinc-700 p-2 rounded-md text-xl'>Rs {count * event.price}/-</h1>

                    </div>

                    <div className='flex justify-end m-5'>
                        {
                            createTicketLoading ?

                                <button  className='btn flex items-center btn-active   tracking-widest btn-outline btn-sm rounded-lg'>Generating your {count > 1 ? 'tickets' : 'ticket'}
                                    <span className='loading loading-dots loading-md'></span>


                                </button>
                                :
                                <button onClick={handleGetYourTicket} disabled={count === 0} className='btn  tracking-widest btn-outline btn-sm rounded-lg'>Hurry up! Get your {count > 1 ? 'tickets' : 'ticket'}
                                    <Icons iconName={'rightArrow'} size='xl' />
                                </button>
                        }
                    </div>



                </div>
            </dialog>

        </div>
    )
}

export default BuyTicketModal
