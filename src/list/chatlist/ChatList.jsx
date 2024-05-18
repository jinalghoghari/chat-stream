import React from 'react'
import './chatlist.css'
import { useState } from 'react'

const ChatList = () => {

    const [addMode, setAddMode] = useState(false)

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder='Search' />
                </div>
                <img src={addMode ? './minus.png' : "./plus1.png"} alt="" className='add' onClick={() => setAddMode((prev) => !prev)} />
            </div>
            <div className="item">
                <img src="avtar.png" alt="" />
                <div className="texts">
                    <span>jina G</span>
                    <p>hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avtar.png" alt="" />
                <div className="texts">
                    <span>jina G</span>
                    <p>hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avtar.png" alt="" />
                <div className="texts">
                    <span>jina G</span>
                    <p>hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avtar.png" alt="" />
                <div className="texts">
                    <span>jina G</span>
                    <p>hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avtar.png" alt="" />
                <div className="texts">
                    <span>jina G</span>
                    <p>hello</p>
                </div>
            </div>
            <div className="item">
                <img src="avtar.png" alt="" />
                <div className="texts">
                    <span>jina G</span>
                    <p>hello</p>
                </div>
            </div>
        </div>
    )
}

export default ChatList