import React from 'react'
import Icons from '../Icons'

const EventDetailsModal = ({ event }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <button className="" onClick={() => document.getElementById(`${event._id}-detail-method`).showModal()}>
               detailss

            </button>


            <dialog id={`${event._id}-detail-method`} className="modal">
                <div className="modal-box bg-zinc-700 rounded-xl p-2  ">
                    <div className="modal-action   m-0">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-xs btn-outline border-none">

                                <Icons iconName={'close'} size='xl' />
                            </button>
                        </form>
                    </div>
                    <div className='relative overflow-hidden h-80 w-full  '>
                    <img src={event.imgs[0] || "https://images.unsplash.com/photo-1472691681358-fdf00a4bfcfe?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    className='rounded-xl opacity-50 h-full w-full object-cover' alt="" />
                    <h3 className="px-1 absolute  top-0 h-full flex flex-col items-center justify-center text-center w-full  right-auto left-auto  font-bold    text-2xl text-white tracking-widest">{event.name}</h3>
                    </div>

                   
                </div>
            </dialog>

        </div>
    )
}

export default EventDetailsModal
