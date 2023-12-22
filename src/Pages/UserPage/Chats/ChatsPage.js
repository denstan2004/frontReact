import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './ChatPage.css';
import UserSideBar from "../UserSideBar";
import SideBar from "../../MainPage/SideBar";
import refreshToken from "../../../Helpers/refreshToken"; // Підключаємо файли стилів

function ChatPage() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const authorized = await refreshToken();
                setIsAuthorized(authorized);
            } catch (ex) {
                console.error('Error during authorization check:', ex);
            }
        };

        checkAuthorization();
    }, []);
    const chats = [
        {
            username: 'User1',
            fullName: 'John Doe',
            lastMessage: 'Hello there!'
        },
        {
            username: 'User2',
            fullName: 'Jane Smith',
            lastMessage: 'How are you?'
        },
        // Додайте більше чатів, які потрібно
    ];

    function handleClick(username) {
        localStorage.setItem('chatname', username);
        window.location.href = '/chat'; // Перехід на новий URL
    }

    return (
        <div>
            {isAuthorized ? <UserSideBar /> : <SideBar />}
            <div className="chat-page-container">

                <div className="chat-list">
                    {chats.map((chat, index) => (
                        <div key={index} className="chat-link" onClick={() => handleClick(chat.username)}>
                            <div className="chat-item">
                                <div className="chat-info">
                                    <div className="username">{chat.username}</div>
                                    <div className="full-name">({chat.fullName})</div>
                                </div>
                                <div className="last-message">{chat.lastMessage}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
}

export default ChatPage;
