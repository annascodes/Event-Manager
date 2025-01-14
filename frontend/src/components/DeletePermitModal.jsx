import React from 'react'
import Icons from './Icons'

const DeletePermitModal = ({ id = null, title = 'no title', setDelPermit = null }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                onClick={() => {
                    document.getElementById(`${id}`).showModal()
                }}
                className='tooltip   border-none text-white   hover:bg-red-500 hover:border-red-500 hover:text-white btn btn-xs btn-outline rounded-md tracking-widest'>
                <Icons iconName='delete' size='xl'  />
                {/* delete */}
            </button>


            <dialog id={`${id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-red-400 text-lg text-center tracking-wider">Do you really want to delete?</h3>
                    <h3 className="font-bold text-lg flex flex-row gap-2 items-center justify-center">

                        {/* <Icons iconName={'file'} size='4xl' color='text-blue-500'  /> */}
                        <h1 className='text-xs tracking-widest my-1 uppercase'>
                            ( Will be deleted
                            permanently )</h1>
                        {/* <Icons iconName={'delete'} size='4xl' color='text-red-700'  /> */}
                    </h3>



                    <h3 className="font-bold  text-2xl text-center tracking-wider">"{title}"</h3>

                    <div className="modal-action">
                        <form method="dialog" className='w-full flex justify-around'>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-active">No</button>
                            <button onClick={()=>setDelPermit(true)} className="btn btn-sm btn-error">Yes</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default DeletePermitModal
