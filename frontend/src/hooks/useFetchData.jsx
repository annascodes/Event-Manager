import React, { useState } from 'react'

const useFetchData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
   
    const getFetchedData = async(url,formData)=>{
        console.log(url)
        console.log(formData)
       try {
           setLoading(true)
           const res = await fetch(url,
            {
                method:'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            }
           );
           const data_ = await res.json()
           if(!res.ok){
               console.log(`useFetch err1 while visigin:<${url}>`)
               console.log(data_.message)
               setErr(data_.message)
               setLoading(false)
           }else{
               console.log(data_)
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
   
    
   
    return {getFetchedData ,data, loading, err}
}

export default useFetchData
