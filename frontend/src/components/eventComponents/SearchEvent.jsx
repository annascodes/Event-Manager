import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Icons from '../Icons'
import usePost from '../../hooks/usePost'
import { toast } from 'sonner'


// import Icons from '../components/Icons'

const SearchEvent = () => {
    const [searchTerm, setSearchTerm] = useState(null)
    const [showDiv, setShowDiv] = useState(true)
    const [searchedData, setSearchedData] = useState(null)
    const {post, data, loading, err} = usePost('/api/event/searchevent')

    const handleSearch = () => {
        console.log('Search term:', searchTerm);

        if(!searchTerm.trim() || searchTerm.trim()===' '){
            toast.info('Write something to search event')
            return
        }
        setShowDiv(true)
        post({searchTerm: searchTerm.trim()})
        // Add your search logic here
    };
    useEffect(()=>{
        if(data)
        {
            console.log(data)
            setSearchedData(data)
        }

    },[data])
    return (
        <div>
            <div className='flex justify-center my-5'>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}

                        type="text" className="grow" placeholder="Search events" />
                    {
                        loading ?
                            <span className='loading loading-dots loading-md'></span> :
                            <Icons iconName={'search'} />

                    }
                </label>
            </div>



            {
                searchedData &&
                <div className='flex items-center justify-center gap-4 p-2'>
                    <h1 className='text-xs tracking-widest '>Searched results ( {searchedData && searchedData.length} )</h1>

                    {
                        showDiv ?
                            <button onClick={() => setShowDiv(false)} className='btn btn-xs btn-outline rounded-md'> Hide
                                <Icons iconName={'closeEye'} size='lg' />
                            </button>
                            :
                            <button onClick={() => setShowDiv(true)} className='btn btn-xs btn-outline rounded-md'> Show
                                <Icons iconName={'openEye'} size='lg' />
                            </button>

                    }

                </div>
            }

            {
                (showDiv && searchedData) &&
                <div className=' max-h-96 bg-neutral-700 rounded-xl m-2 p-2 overflow-scroll no-scrollbar'>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="table">
                            {/* head */}
                            <thead>
                                {/* <tr>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Job</th>
                                </tr> */}
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    searchedData.length===0 && 
                                    <div className='flex justify-center opacity-60 text-xs tracking-widest'>
                                        <span>( no results found )</span>
                                    </div>
                                }

                                {
                                   searchedData.map((e, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    {++i}
                                                </td>
                                                <td className='  w-1/2'>
                                                    <div className='relative w-96 h-32 overflow-hidden rounded-lg'>
                                                        <img src={e.imgs[0] ||"https://images.unsplash.com/photo-1576769619992-ff94a24e9474?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8"} className='w-full h-full object-cover opacity-70' alt="" />
                                                        <Link
                                                        to={`/eventdetails/${e._id}`}
                                                        className='hover:underline p-2 underline-offset-4 absolute top-0 w-full h-full flex flex-row justify-center items-center text-lg font-extrabold text-center text-white tracking-widest'>{e.name}</Link>
                                                    </div>
                                                </td>
                                                <td className='  w-1/2'>
                                                    <div className='min-w-72  '>
                                                        <h1 className='flex flex-row items-center gap-1'>
                                                            <span className='text-yellow-300 text-xs tracking-widest'>status</span>
                                                            Registration open
                                                        </h1>
                                                        <h1 className='flex flex-row items-center gap-1'>
                                                            <span className='text-yellow-300 text-xs tracking-widest'>last date</span>
                                                            Registration open
                                                        </h1>
                                                        <h1 className='flex flex-row items-center gap-1'>
                                                            <span className='text-yellow-300 text-xs tracking-widest'>venue</span>
                                                            expo center lhr
                                                        </h1>


                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>

                </div>
            }

        </div>
    )
}

export default SearchEvent
