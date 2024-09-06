import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../context/auth-context";

function UserProfilePage() {
    const navigate = useNavigate();
    const { isAuthenticated, user} = useAuth()

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">User Profile</h2>
                    {isAuthenticated ? (
                        <div>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>First Name:</strong> {user.first_name}</p>
                            <p><strong>Last Name:</strong> {user.last_name}</p>
                            <p><strong>Bio:</strong> {user.bio}</p>
                        </div>
                    ) : (<></>) }
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
