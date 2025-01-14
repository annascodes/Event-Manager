import React, { useRef } from 'react'
import Icons from '../Icons';

const SelectEventImgs = ({ imgs, setImgs }) => {
    const imgRef = useRef();
    const handleImgs = (e) => {
        const files = e.target.files
        let imgUrls = [];

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    imgUrls.push(reader.result);
                    if (imgUrls.length === files.length) {
                        if (imgs.length === 0)
                            setImgs(imgUrls)
                        if (imgs.length !== 0)
                            setImgs([...imgs, ...imgUrls])
                    }
                }
                reader.readAsDataURL(file);
            }
        }

    }
    return (
        <div>


            <input type="file" onChange={handleImgs} ref={imgRef} multiple hidden className="file-input w-full max-w-xs" />

            <div className='flex items-center '>
                <Icons iconName={'dot'} size='4xl' color={`${imgs.length!==0     ? 'text-green-500' : 'text-red-500'}`} />

                <div className='flex items-center px-2 py-1 gap-2 border border-stone-700 rounded-lg justify-center'>
                    <h1 className='text-xs text-blue-300 tracking-widest'>Select imgs</h1>
                    <div
                        onClick={() => imgRef.current.click()}
                        className=' hover:cursor-pointer hover:bg-zinc-700 duration-200 p-1 rounded-lg bg-zinc-800'>
                        <Icons iconName={'image'} size='4xl' />
                    </div>

                </div>

            </div>

            {
                imgs.length>0 &&
                <h1 className='text-center bg-zinc-900 tracking-widest text-xs  rounded-lg mt-5'>Selected images ( {imgs.length} )</h1>

            }
            <div className='flex flex-row flex-wrap items-center mt-4 gap-2'>
                {
                    imgs && imgs.map((i, indx) => {
                        return (
                            <div key={indx} className=' relative w-40 h-40 bg-gray-800 rounded-lg overflow-hidden'>
                                <img src={i} className='w-full h-full object-contain' alt="" />
                                <button
                                    onClick={() => {
                                        setImgs(imgs.filter(img => img !== i))
                                    }}
                                    className='absolute bottom-1 right-1 btn btn-xs btn-outline rounded-md  '>
                                    {/* <Icons iconName={'close'} size='2xl' /> */}
                                    remove it
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SelectEventImgs
