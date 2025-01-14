import React, { useEffect, useRef, useState } from 'react'
import Icons from '../components/Icons'
import usePost from '../hooks/usePost'
import { toast } from 'sonner'
import useFetch from '../hooks/useFetch'

const Gallery = () => {

    const { post: postImgs, data: postImgsData, loading: postImgsLoading, err: postImgsErr } = usePost('/api/event/addingallery')
    const { data: galleryImgs, loading: galleryImgsLoading, err: galleryImgsErr } = useFetch('/api/event/getgallery')
    const [allPhotos, setAllPhotos] = useState(null)

    const imgRef = useRef()
    const [imgs, setImgs] = useState([])
    const handleSubmit = () => {
        postImgs({
            imgs: imgs
        })

    }

    useEffect(() => {
        if (postImgsData) {
            console.log(postImgsData)
            setImgs([])
            toast.success('uploaded successfully')
        }
    }, [postImgsData])

    useEffect(() => {
        if (galleryImgs) {
            console.log(galleryImgs)
            setAllPhotos(galleryImgs)
        }

    }, [galleryImgs])

    const handleImgs = (e) => {
        const files = e.target.files;
        const ImgsArray = [];

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    ImgsArray.push(reader.result);
                    if (ImgsArray.length === files.length)
                        setImgs(ImgsArray)
                }
                reader.readAsDataURL(file)
            }
        }
    }
    console.log('imgs: ', imgs)
    return (
        <div>
            <h1 className='text-xs my-5  tracking-widest text-center uppercase'>Our gallery wall</h1>

            <div className='flex flex-col items-center gap-4 justify-center py-10'>
                <input
                    onChange={handleImgs}
                    ref={imgRef}
                    hidden
                    type="file" multiple className="file-input w-full max-w-xs" />

                <div onClick={() => imgRef.current.click()} className='hover:bg-zinc-900 p-2 rounded-md  flex items-center tracking-widest text-yellow-500 hover:cursor-pointer '>
                    <Icons iconName={'image'} size='4xl' />
                    select
                </div>

                <div className='flex  p-10 rounded-lg justify-center flex-wrap gap-2 '>
                    {
                        imgs.map((i, indx) => {
                            return (
                                <div className={` ${indx % 2 === 0 ? 'w-52' : 'w-96'}  h-52 rounded-lg shadow-2xl overflow-hidden  shadow-slate-100 `} >
                                    <img src={i} className='w-full h-full object-cover' alt="some img" />
                                </div>
                            )
                        })
                    }
                </div>

                {
                    postImgsLoading ? <span className='loading loading-dots loading-lg'></span>
                        : (
                            imgs.length !== 0 && <button onClick={handleSubmit} className='btn btn-outline btn-sm rounded-md'>upload</button>
                        )
                }
            </div>

            {/* -----  */}
            <div className='flex flex-row justify-center flex-wrap'>
                {
                    allPhotos && allPhotos.map((g, indx) => {
                        return (
                            <div className={` flex flex-row justify-center flex-wrap p-2`} >

                                {
                                    g.imgs.map((i, i_indx) => {
                                        return (
                                            <div className='relative rounded-lg  shadow-lg shadow-zinc-500 w-80 h-80 m-2 overflow-hidden'>
                                                <img src={i} className='w-full h-full object-cover ' alt="some img" />
                                                <span className='absolute top-1  right-1 text-2xl opacity-10 duration-200 hover:opacity-100 tracking-widest text-red-300' >
                                                    <Icons iconName={'delete'} />
                                                </span>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }
            </div>

            {/* -----  */}


        </div>
    )
}

export default Gallery
