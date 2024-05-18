import React from 'react'
import './userinfo.css'

const UserInfo = () => {
    return (
        <div className='userInfo'>
            <div className="user">
                <img src='avtar.png' alt='' />
                <h2>jin G</h2>
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