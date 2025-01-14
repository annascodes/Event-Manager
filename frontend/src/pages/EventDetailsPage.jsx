import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RoleBadge from '../components/invitationComponents/RoleBadge';
import SortBy from '../components/SortBy'
import moment from 'moment';
import Loading from '../components/Loading'
import ImgsShowCase from '../components/ImgsShowCase';
import { useSelector } from 'react-redux';
import Icons from '../components/Icons';
import DeletePermitModal from '../components/DeletePermitModal';
import BuyTicketModal from '../components/eventComponents/BuyTicketModal';
import useDelete from '../hooks/useDelete';
import { toast } from 'sonner';


const EventDetailsPage = () => {
    const { currentUser } = useSelector(state => state.user)
    const { id } = useParams();
    const navigate = useNavigate()

    const {
        deleteMethod,
        data: deleteEventData,
        loading: deleteEventLoading,
        err: deleteEventErr } = useDelete()
    const [delPermit, setDelPermit] = useState(false)

    const { data, loading, err } = useFetch(`/api/event/eventdetails/${id}`)
    const [visitorsStats, setVisitorsStats] = useState(null)
    const [sortBy, setSortBy] = useState('all')
    const handleSortBy = (value) => {
        setSortBy(value)
    }

    const handleDelEvent = () => {
        console.log('deleting event: ', data.event.name)
        deleteMethod(`/api/event/deleteevent/${data.event._id}`)
    }
    useEffect(()=>{
        if(deleteEventData){
            toast.success('Event deleted successfully')
            navigate('/events')
        }

    },[deleteEventData])
   

    useEffect(() => {
        if (delPermit) {
            handleDelEvent()
        }

    }, [delPermit, setDelPermit])

    useEffect(() => {
        if (data) {
            console.log(data)
            let admins = 0;
            let hosts = 0;
            let guests = 0;
            data?.invitedPeople.map(p => {
                if (p.comingAs === 'admin') admins += 1;
                if (p.comingAs === 'host') hosts += 1;
                if (p.comingAs === 'guest') guests += 1;
            })
            setVisitorsStats({ admins, hosts, guests })
        }
    }, [data])
    // console.log(data.imgs)

    if(deleteEventLoading){
        return <Loading/>
    }
    if (loading) {
        return <Loading type='loading-spinner' />
    }
    return (
        <div className='md:w-2/3  mx-auto px-2 py-1'>


            {
                (data && data.event.imgs.lenght !== 0) &&
                <ImgsShowCase title={data.event.name} imgs={data.event.imgs} />

            }



            {/* ---- edit delete buyTicket--- */}
            <div className='flex border-b pb-3 border-zinc-700 flex-row items-center justify-between'>
                {
                    data &&
                    currentUser._id === data.event?.createdBy._id &&
                    <button onClick={() => {
                        navigate('/editevent', { state: data.event })
                    }} data-dip='edit' className='tooltip  hover:bg-blue-500 hover:border-blue-500 hover:text-white btn btn-xs btn-outline rounded-md border-none tracking-widest'>
                        <Icons iconName='edit' size='xl' />
                        {/* edit */}
                    </button>
                }
                {
                    data &&
                    currentUser._id === data.event?.createdBy._id &&
                    <button
                    // disabled={deleteEventLoading}
                    // className={`${deleteEventLoading && 'opacity-15'}`} 
                    >
                        <DeletePermitModal
                            key={data.event._id}
                            id={data.event._id}
                            title={data.event.name}
                            setDelPermit={setDelPermit}
                        />
                    </button>
                }
                {
                    data &&
                    <BuyTicketModal key={data.event._id} event={data.event} />
                }
            </div>

            {/* -------details------- */}

            {
                data &&
                <div>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> organized by </span>
                        <span className='text-zinc-300'>
                            {data.event.createdBy.firstName} {data.event.createdBy.lastName}
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center  text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> venue </span>
                        <span className='text-zinc-300'>
                            {data.event.venue}
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> timming </span>
                        <span className='text-zinc-300'>
                            {data.event.timeStart} to {data.event.timeEnd}
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> status </span>
                        <span className='text-zinc-300'>
                            {data.event.status}
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> price </span>
                        <span className='text-zinc-300'>
                            Rs {data.event.price}/-
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> city </span>
                        <span className='text-zinc-300'>
                            {data.event.city}
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> public OR private </span>
                        <span className='text-zinc-300'>
                            {data.event.isPublic ? 'Public' : 'Private'}
                        </span>
                    </h1>
                    <h1 className='flex flex-row items-center text-yellow-400 gap-2'>
                        <span className='text-xs tracking-widest'> registration will be end on </span>
                        <span className='text-zinc-300'>
                            {data.event.registrationEndDate && moment(data.event.registrationEndDate).format('ll ddd')}
                        </span>
                    </h1>
                </div>
            }






            <div className='mt-16'>
                <SortBy title={'sort by: '} options={['all', `${visitorsStats?.admins} admin`, `${visitorsStats?.hosts} host`, `${visitorsStats?.guests} guest`]} setValu={setSortBy} />
            </div>







            <div className="overflow-x-auto mb-16 no-scrollbar bg-zinc-800 rounded-xl ">
                <table className="table table-zebra no-scrollbar">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr#</th>
                            <th>Email</th>
                            <th className='text-center'> Coming as</th>
                            <th>Response</th>
                            <th>Responded on</th>
                            <th className='text-center'> Ticket no</th>
                            <th className='text-center'> Ticket purchase on</th>
                        </tr>
                    </thead>
                    <tbody className='no-scrollbar'>

                        {data && data.invitedPeople.map((p, pi) => {
                            return (
                                (p.comingAs === sortBy.split(' ')[1] || sortBy === 'all') &&
                                <tr >
                                    <th>{++pi} </th>

                                    <td>
                                        <button onClick={() => {
                                            navigate('/profile', { state: p.userId })
                                        }}
                                            className='hover:underline underline-offset-2'>
                                            {p.email}
                                        </button>
                                    </td>
                                    <td>
                                        <RoleBadge role={p?.comingAs} />
                                    </td>

                                    <td className='flex items-center'>
                                        {
                                            p.response &&
                                            <div className='bg-white text-black rounded-md p-1 text-xs tracking-widest '>
                                                {p.response}
                                            </div>
                                        }
                                    </td>
                                    <td className='text-center text-xs'>
                                        {p.responseDate && moment(p?.responseDate).format('ll ddd')}
                                    </td>
                                    <td className='text-xs'> {p.ticketNo && p.ticketNo.toString().slice(-5)} </td>
                                    <td className='text-xs'>
                                        {p.ticketPurchaseOn && moment(p.ticketPurchaseOn).format('ll ddd')}
                                    </td>


                                    {/* <td className='flex justify-center items-center'>
                                        {p.ticketNo}
                                    </td>

                                    <td className='flex justify-center items-center'>
                                        {p.ticketPurchaseOn}
                                    </td>

                                    <td className='flex justify-center items-center'>  <RoleBadge role={p?.comingAs} /></td> */}
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>



        </div >
    )
}

export default EventDetailsPage
