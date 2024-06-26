import React, { useEffect, useState } from 'react';
import UserSideBar from './UserSideBar';
import refreshToken from '../../Helpers/refreshToken';
import './UserPage.css';
import SideBar from "../MainPage/SideBar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function UserPage() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const authorized = await refreshToken();
                setIsAuthorized(authorized);

                if (authorized) {
                    let decoded = jwtDecode(localStorage.getItem("jwtToken"));          
                              setUserRole(decoded.role);
                    const response = await axios.get(`https://localhost:7068/api/User/id/${decoded.Id}`);
                    if (response.status === 200) {
                        setUser(response.data);
                        console.log(response.data);
                    }
                }
            } catch (ex) {
                console.error('Error during authorization check:', ex);
            }
        };

        checkAuthorization();
    }, []);

    if (!isAuthorized) {
        return (
            <div>
                {isAuthorized ? <UserSideBar /> : <SideBar />}
                Error: User not authorized.
            </div>
        );
    }

    const handleEditAccount = () => {
        // Дії при натисканні на кнопку "Редагувати акаунт"
        // Наприклад, відкриття форми для редагування
    };

    return (
        <div>
            {isAuthorized ? <UserSideBar /> : <SideBar />}
            <div className="single-page-container">
                {user && (
                    <div className="user-card">
                        <div className="left-section">
                        <div className="user-image">
    <img src={`data:image/jpeg;base64,${user.imageBase64}`} alt="User Avatar" />
</div>

                            <h1>{user.username}</h1>
                            <p>{user.firstname} {user.lastname}</p>
                        </div>
                        <div className="right-section">
                            <p className="user-description">
                                <strong>Role:</strong> {userRole}
                            </p>
                            <p className="user-description">
                                <strong>Skills:</strong> {user.skills || 'No skills provided'}
                            </p>
                            <p className="user-description">
                                <strong>Education:</strong> {user.education || 'No education information provided'}
                            </p>
                            <p className="user-description">
                                <strong>Experience:</strong> {user.expirience || 'No experience information provided'}
                            </p>
                            {userRole === 'Investor' && (
                                <p className="user-description">
                                    <strong>Investment Info:</strong> {user.investment_info || 'No investment information provided'}
                                </p>
                            )}

                            <Link to="/user/page/edit">
                                <button className="edit-button-user" onClick={handleEditAccount}>
                                    Edit Account
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserPage;
