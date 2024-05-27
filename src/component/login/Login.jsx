import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore";
import upload from '../../lib/upload'


const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const [loading, setLoading] = useState(false)

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }

    }
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formdata = new FormData(e.target)

        const { username, email, password } = Object.fromEntries(formdata)

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upload(avatar.file)
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: []
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: []
            });

            toast.success("Account created! You Can Login Now")

        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }

    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formdata = new FormData(e.target)

        const { email, password } = Object.fromEntries(formdata)


        try {
            await signInWithEmailAndPassword(auth, email, password)

        } catch (error) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
            toast.success("now you are in")
        }

    }



    return (
        <div className="login">
            <div className="item">
                <h2>WelCome To Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" name="email" placeholder='Email@gmail.com' />
                    <input type="password" name="password" placeholder='Password' />
                    <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
                </form>
            </div>
            <div className="seperator"></div>
            <div className="item">
                <h2>Create An Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avtar.png"} alt="" />
                        Upload An Image
                    </label>
                    <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" name="username" placeholder='UserName' />
                    <input type="text" name="email" placeholder='Email@gmail.com' />
                    <input type="password" name="password" placeholder='Password' />
                    <button disabled={loading} >{loading ? "Loading" : "Sign Up"}</button>
                </form>
            </div>


        </div>
    )
}

export default Login