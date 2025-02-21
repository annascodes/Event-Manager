import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputTag from '../components/InputTag'
import Button from '../components/Button'
import Error from '../components/Error'
import { IoMdArrowRoundDown } from "react-icons/io";
import { toast } from 'sonner'


import usePost from '../hooks/usePost' 

const Registration = () => {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState(null)
    const {post, data, loading, err:regErr} = usePost('/api/auth/register')
    const navigate = useNavigate()

    const handleRegistration = async () => {
        console.log(firstname, lastname, email, password)
        if (!firstname || !lastname || !email || !password) {
            console.log('all fields are required')
            setErr('all fields are required')
            return
        }

        post(
            {
                firstName:firstname,
                lastName: lastname,
                email,
                password
            }
        )
    }

    useEffect(()=>{
        if(data){
            console.log(data)
            navigate('/login')
        }
    },[data])

    const showToast = ()=>{
        toast.error('this is testing of sonner')
    }
    return (
        <div>
            <div className=' md:w-1/3 px-2 mx-auto flex flex-col gap-2 my-5'>
                <h1 className='text-4xl uppercase  tracking-widest my-2 flex flex-row justify-center items-center'>
                    Registration

                    <IoMdArrowRoundDown className='text-2xl text-zinc-500' />
                </h1>

                <InputTag fieldName='first name' type='text' setErr={setErr} setValue={setFirstname} />
                <InputTag fieldName='last name' type='text' setErr={setErr} setValue={setLastname} />
                <InputTag fieldName='email' type='email' setErr={setErr} setValue={setEmail} />
                <InputTag fieldName='password' type='password' setErr={setErr} setValue={setPassword} />

                <Button onclick={handleRegistration}  btnName='Register' outline='outline' size='sm' />

                {/* <Button onclick={showToast} btnName='show toast' outline='outline' size='sm' /> */}


                {err && <Error msg={err} />}

                {regErr && <Error msg={regErr} />}

                <p className='text-zinc-500'>Aready have an account? <Link to={'/login'} className='underline underline-offset-4 text-blue-200 text-sm'>Login</Link> </p>
            </div>
        </div>
    )
}

export default Registration
