import React from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

const chat = () => {

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")

    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji)
        setOpen(false)
    }

    return (
        <div className='chat'>

            {/* TOP */}
            <div className="top">
                <div className="user">
                    <img src="./avtar.png" alt="" />
                    <div className="texts">
                        <span>jin G</span>
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
                <div className="message own">

                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, blanditiis!</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avtar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, blanditiis!</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">

                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, blanditiis!</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message">
                    <img src="./avtar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, blanditiis!</p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div className="message own">

                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, blanditiis!</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>


            {/* BOTTOM */}
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mike.png" alt="" />

                </div>
                <input type="text"
                    placeholder='Type a Message....'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className='sendBtn'>Send</button>
            </div>

        </div>
    )
}

export default chat