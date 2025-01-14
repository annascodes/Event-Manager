import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Icons from '../Icons'
import usePost from '../../hooks/usePost'
import { toast } from 'sonner'

const InvitationResponse = ({ invitation, invs, setInvs }) => {
    const [response, setResponse] = useState(null)
    const { post, data, loading, err } = usePost('/api/invitation/postresponse')
    // console.log(invitation)
    const handleResponsebtn = (response) => {
        setResponse(response)
    }

    
    useEffect(() => {
        if (data) {
            console.log(data)
            toast.success(`Response sent as: ${response.toUpperCase()} `)
            // toast.loading()
            let temp = invs.map(i=>{
                if(i._id === invitation._id){
                    return {...i, response: data.response}
                }else{
                    return i
                }
            })
            setInvs(temp)
        }
    }, [data])

    useEffect(()=>{
        if(loading){
            // const toastId = toast.loading('sending response...');
             toast.info('sending response...');

            // // Simulate an async operation
            // setTimeout(() => {
            //   // Update the toast with success or error
            //   toast.success('Action completed successfully!', {
            //     id: toastId, // Reuse the same toast ID
            //   });
            // }, 3000); // Simulate a 3-second delay
        }
    },[loading])
    console.log(loading)
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                onClick={() => {
                    document.getElementById(`${invitation._id}-invitation-response`).showModal()
                    // console.log('happy')
                    // adding role to the invitation
                }}
                className='btn hover:scale-125 duration-300 btn-neutral tracking-widest btn-sm  uppercase text-xs'>
                give response
            </button>
            {/* <button className="btn" >open modal</button> */}
            <dialog id={`${invitation._id}-invitation-response`} className="modal">
                <div className="modal-box  p-3 " >
                    <div className="modal-action   m-0">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="">
                                <Icons iconName={'close'} size='2xl' color='hover:scale-150 duration-300 text-red-500' />
                            </button>
                        </form>
                    </div>
                    <h3 className="font-bold text-lg">{invitation.event.name}!</h3>
                    <p className="pt-2 italic">{invitation.event.desc}</p>
                    <p className="pt-2 ">
                        <span className='text-xs tracking-widest text-yellow-300'>address </span>
                        {invitation.event.venue}, {invitation.event.city}
                    </p>
                    <p className="pt-2 ">
                        <span className='text-xs tracking-widest text-yellow-300'>registration end date</span>
                        {moment(invitation.event.registrationEndDate).format('dddd LL')}
                    </p>

                    {/* respons btns  */}
                    <div className='flex flex-row justify-center my-5 gap-5'>

                        <div
                            onClick={() => handleResponsebtn('accepted')}

                            className={`${response === 'accepted' && 'bg-white text-black'} border hover:text-black hover:bg-white border-white uppercase text-sm tracking-widest rounded-lg px-3 py-2 cursor-pointer flex items-center gap-1`}>
                            {response === 'accepted' && <Icons iconName={'good'} size='xl' />}
                            accept
                        </div>

                        <div
                            onClick={() => handleResponsebtn('rejected')}
                            className={` ${response === 'rejected' && 'bg-white text-black'} border  hover:text-black hover:bg-white border-white uppercase text-sm tracking-widest rounded-lg px-3 py-2 cursor-pointer flex items-center gap-1`}>
                            {response === 'rejected' && <Icons iconName={'good'} size='xl' />}
                            reject
                        </div>

                        <div
                            onClick={() => handleResponsebtn('maybe')}
                            className={` ${response === 'maybe' && 'bg-white text-black'} border hover:text-black hover:bg-white border-white uppercase text-sm tracking-widest rounded-lg px-3 py-2 cursor-pointer flex items-center gap-1`}>
                            {response === 'maybe' && <Icons iconName={'good'} size='xl' />}
                            maybe
                        </div>

                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => {
                                console.log({ id: invitation._id, response })
                                post({ id: invitation._id, response })

                            }} className="btn btn-sm btn-primary rounded-lg">
                                <Icons iconName={'plane'} size='xl' />
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default InvitationResponse
