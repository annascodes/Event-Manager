import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(false);
 const [err, setErr] = useState(null);

 const getFetchedData = async()=>{
    try {
        setLoading(true)
        const res = await fetch(url);
        const data_ = await res.json()
        if(!res.ok){
            console.log(`useFetch err1 while visigin:<${url}>`)
            console.log(data_.message)
            setErr(data_.message)
            setLoading(false)
        }else{
            // console.log(data_)
            setData(data_);
            setErr(null);
            setLoading(false)
        }
        
    } catch (error) {
        console.log(`useFetch err2 while visigin:<${url}>`)
        console.log(error)
        setErr(error.message)
        setLoading(false)
    }
 }

 useEffect(()=>{
    getFetchedData()
 },[url])

 return {data, loading, err}
}

export default useFetch
