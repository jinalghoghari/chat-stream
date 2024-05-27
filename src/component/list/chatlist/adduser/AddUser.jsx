import React, { useState } from 'react'
import './adduser.css'
import { db } from '../../../../lib/firebase'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { useUserStore } from '../../../../lib/userStore'


const AddUser = () => {

    const [user, setUser] = useState(null)
    const { currentUser } = useUserStore()

    const handleSearch = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get("username")

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", username));

            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                setUser(querySnapshot.docs[0].data());
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            console.log(newChatRef.id);

            // Check if user chat document exists, create if not
            const userChatDoc = doc(userChatsRef, user.id);
            const userChatDocSnap = await getDoc(userChatDoc);

            if (!userChatDocSnap.exists()) {
                await setDoc(userChatDoc, { chats: [] });
            }

            await updateDoc(userChatDoc, {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

            // Check if currentUser chat document exists, create if not
            const currentUserChatDoc = doc(userChatsRef, currentUser.id);
            const currentUserChatDocSnap = await getDoc(currentUserChatDoc);

            if (!currentUserChatDocSnap.exists()) {
                await setDoc(currentUserChatDoc, { chats: [] });
            }

            await updateDoc(currentUserChatDoc, {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>Search</button>
            </form>

            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avtar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}
        </div>
    )
}

export default AddUser
