import React, { useEffect, useRef } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

const chat = () => {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
    const [chat, setChat] = useState()
    const [img, setImg] = useState({
        file: null,
        url: "",
    })

    const { chatId, user, isCureentUserBlocked, isReceiverBlocked } = useChatStore()
    const { currentUser } = useUserStore()


    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
            setChat(res.data())
        })
        return () => {
            unSub();
        }
    }, [chatId])


    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji)
        setOpen(false)
    }

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }

    }

    const handleSend = async () => {
        if (text === "") return;

        let imgUrl = null

        try {
            if (img.file) {
                imgUrl = await upload(img.file)
            }
        } catch (error) {

        }

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    createdAt: new Date(),
                    text: text, // Ensure the message text is included
                    ...(imgUrl && { img: imgUrl })
                })
            });
            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async (id) => {

                const userChatsRef = doc(db, "userchats", id)
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId)

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
                        userChatsData.chats[chatIndex].updatedAt = Date.now()

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        })
                    }
                }
            })


        } catch (err) {
            console.log(err)
        }
        setImg({
            file: null,
            url: ""
        })
        setText("");
    }




    return (
        <div className='chat'>

            {/* TOP */}
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avtar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>Lorem ipsum, dolor sit amet consect .</p>
                    </div>
                </div>
                <div className="icon">
                    <img src="./phone1.png" alt="" />
                    <img src="./video1.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>

            {/* CENTER */}

            <div className="center">
                {chat?.messages?.map((message) => (
                    <div className={message.senderId === currentUser.id ? "message own" : "message"} key={`${message.createdAt}-${message.senderId}`}>

                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>

                            {/* <span>1 min ago</span> */}
                        </div>
                    </div>
                ))}
                {img.url && (<div className="message own">

                    <div className="texts">
                        <img src={img.url} alt="" />
                    </div>
                </div>
                )}
                <div ref={endRef}>

                </div>
            </div>



            {/* BOTTOM */}
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt="" />
                    </label>
                    <input type="file" id='file' style={{ display: "none" }} onChange={handleImg} />
                    <img src="./camera.png" alt="" />
                    <img src="./mike.png" alt="" />

                </div>
                <input type="text"
                    placeholder={(isCureentUserBlocked || isReceiverBlocked) ? "You can not send a message" : 'Type a Message....'}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isCureentUserBlocked || isReceiverBlocked}

                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendBtn' onClick={handleSend} disabled={isCureentUserBlocked || isReceiverBlocked}>Send</button>
            </div>

        </div>
    )
}

export default chat