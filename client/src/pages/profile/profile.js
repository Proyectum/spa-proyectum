import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/users/profile', {
                    withCredentials: true,
                });
                setUserData(response.data);
            } catch (error) {
                setErrorMessage('You need to sign in to access this page.');
                navigate('/sign-in'); //
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">User Profile</h2>
                    {userData ? (
                        <div>
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            {/* Muestra otros datos del usuario aquí */}
                        </div>
                    ) : (
                        <p>{errorMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
