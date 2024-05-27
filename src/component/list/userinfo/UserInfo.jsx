import React from 'react'
import './userinfo.css'
import { useUserStore } from '../../../lib/userStore'

const UserInfo = () => {
    const { currentUser } = useUserStore()
    return (
        <div className='userInfo'>
            <div className="user">
                <img src={currentUser.avatar || './avtar.png'} alt='' />
                <h2>{currentUser.username}</h2>
            </div>
            <div className="icon">
                <img src="./more.png" alt="" />
                <img src="./video1.png" alt="" />
                <img src="./edit-icon.png" alt="" />
            </div>

        </div>
    )
}

export default UserInfo