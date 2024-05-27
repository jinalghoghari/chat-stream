import React from 'react'
import './detail.css'
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Detail = () => {
    const { chatId, user, isCureentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
    const { currentUser } = useUserStore()

    const handleBlock = async () => {
        if (!user) return
        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            })
            changeBlock()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avtar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
            </div>

            <div className="info">

                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowup1.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowup1.png" alt="" />
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>Shared Photo</span>
                        <img src="./arrowdown.png" alt="" />
                    </div>

                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./photo.png" alt="" />
                                <span>image_2024.png</span>
                            </div>
                            <img src="./download.png" alt="" />
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./photo.png" alt="" />
                                <span>image_2024.png</span>
                            </div>
                            <img src="./download.png" alt="" />

                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./photo.png" alt="" />
                                <span>image_2024.png</span>
                            </div>
                            <img src="./download.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="option">
                    <div className="title">
                        <span>shared files</span>
                        <img src="./arrowup1.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{isCureentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User Bloked" : "Block User"}</button>
                <button className='logout' onClick={() => auth.signOut()}>LogOut</button>
            </div>
        </div>
    )
}

export default Detail