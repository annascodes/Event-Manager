import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InputTag from '../components/InputTag'
import Button from '../components/Button';
import Error from '../components/Error';
import { IoMdArrowRoundDown } from "react-icons/io";
import usePost from '../hooks/usePost';
import { useDispatch, useSelector } from 'react-redux';
import {signedIn} from "../redux/user/userSlice"


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [err, setErr] = useState(null)

    const {post, data:loginUser, loading:loginLoading, err:loginErr} = usePost('/api/auth/login')
    const dispatch = useDispatch()
   

    const handleLogin = async () => {
        if (!email || !password) {
            console.log('all fields are required')
            setErr('all fields are required')
            return
        }
        // console.log(email, password)
        post({
            email,
            password
        })

    }

    useEffect(()=>{
        if(loginUser)
            dispatch(signedIn(loginUser))

        if(loginErr) setErr(loginErr)
           

    },[loginUser])

    return (
        <div>
            <div>
                <div className=' md:w-1/2 px-2 mx-auto flex flex-col gap-2 my-5'>
                    <h1 className='text-4xl uppercase  tracking-widest my-2 flex flex-row justify-center items-center'>
                        login
                        <IoMdArrowRoundDown className='text-2xl text-zinc-500' />
                    </h1>

                    <InputTag fieldName='email' type='email' setErr={setErr} setValue={setEmail} />
                    <InputTag fieldName='password' type='password' setErr={(setErr)} setValue={setPassword} />
                    <Button onclick={handleLogin} btnName='Login' outline='outline' size='btn-sm' />

                    {err && <Error msg={err} />}
                    {loginErr && <Error msg={`${loginErr}: ${email}`} />}

                    <p className='text-zinc-500 mt-10'>Don't have an account? <Link to={'/register'} className='underline underline-offset-4 text-blue-200 text-sm'>Register here</Link> </p>
                </div>
            </div>

        </div>
    )
}

export default Login
