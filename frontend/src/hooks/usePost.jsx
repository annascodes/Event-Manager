import React, { useState } from 'react'

const usePost = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const post = async(formData)=>{
        try {
            setLoading(true)
            const res = await fetch(url,
                {
                    method: 'post',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                }
            )
            const data_ = await res.json();
            if(!res.ok){
                console.log(`usePost err1 while visiting:<${url}>`)
                console.log(data_.message)
                setErr(data_.message)
                setLoading(false);
                setData(null)
            }else{
                console.log(data_)
                setData(data_);
                setLoading(false);
                setErr(null)
            }
            
        } catch (error) {
            console.log(`usePost err2 while visiting:<${url}>`)
            console.log(error)
            setLoading(false);
            setErr(error.message)
            setData(null)

        }
    }
    return {post, data, loading, err}
}

export default usePost
