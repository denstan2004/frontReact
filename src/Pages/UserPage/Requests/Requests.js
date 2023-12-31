import React, { useEffect, useState } from "react";
import refreshToken from "../../../Helpers/refreshToken";
import axios from "axios";
import "./Request.js.css"
import { jwtDecode } from "jwt-decode";
import UserSideBar from "../UserSideBar";
import SideBar from "../../MainPage/SideBar";
import "./Request.js.css"
import {useNavigate} from "react-router-dom";

// Define the RequestCard component separately
const RequestCard = ({ req }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        let decoded = jwtDecode(localStorage.getItem("jwtToken"));

        async function findUserById() {
            try {
                const response = await axios.get(`http://ec2-51-20-249-147.eu-north-1.compute.amazonaws.com:7224/api/User/Id/${req.user1Id}`);
                if (response.status === 200) {
                    console.log(response.data)
                    setUserData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        if (req.user1Id) {
            findUserById();
        }
    }, [req.user1Id]);

    const Request = (id,status) => {
        let decoded = jwtDecode(localStorage.getItem("jwtToken"))
         console.log(status)
        const response = axios.put("http://ec2-51-20-249-147.eu-north-1.compute.amazonaws.com:7224/api/Friends/ChangeStatus",{
            user1id: id ,
            user2id:decoded.Id,
            status: status
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        if(response.status===200)
        {
            window.location.reload();
        }

    };

    return (
        <div className="request-cards-container">
            <div className="request-card-user">
            {userData && (
                <div >
                    <img className="request-card-img" src={userData.avatar} alt="Avatar" /> {/* Відображення аватара */}
                    <h3>{userData.username}</h3>
                    <div className="request-actions">
                        <button onClick={() =>Request(userData.id,1)}>Accept</button>
                        <button onClick={() => Request(userData.id,2)}>Decline</button>
                        <button onClick={() => Request(userData.id,3)}>Block</button>
                    </div>
                </div>
            )}
        </div>
        </div>

    );
};


const Requests = () => {
    const [Allrequests, setAllrequests] = useState(undefined);
    const [isAuthorized, setIsAuthorized] = useState(false);
    let decoded = jwtDecode(localStorage.getItem("jwtToken"));
    let userid = decoded.Id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorized = await refreshToken();
                setIsAuthorized(authorized);

                if (authorized) {
                    const response = await axios.get(
                        `http://ec2-51-20-249-147.eu-north-1.compute.amazonaws.com:7224/api/Friends/Recieved/${userid}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                            },
                        }
                    );

                    if (response.status === 200) {
                        setAllrequests(response.data);
                        console.log(response);

                    } else {
                        console.error("ggg");
                    }
                }
            } catch (error) {
                console.error("Error during data fetching:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {isAuthorized ? <UserSideBar /> : <SideBar />}
            {Array.isArray(Allrequests) && Allrequests.length > 0 ? (

                Allrequests.map((request) => (
                    <RequestCard key={request.id} req={request} />
                ))
            ) : (
                <p>No requests</p>
            )}
        </div>
    );
};

export default Requests;
