import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function SignUpPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.username.length < 3 || form.username.length > 8) {
            setErrorMessage('Username must be between 3 and 8 characters.');
            setShowModal(true);
            return;
        }

        if (form.password.length < 6 || form.password.length > 15) {
            setErrorMessage('Password must be between 6 and 15 characters.');
            setShowModal(true);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setShowModal(true);
            return;
        }

        if (!form.termsAccepted) {
            setErrorMessage('You must accept the terms and conditions.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.post('/api/auth/sign-up', form);
            navigate("/sign-in")
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="username">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                minLength="3"
                                maxLength="8"
                            />
                            <span className="label-text-alt text-sm text-red-500">
                {form.username.length < 3 && 'Username must be at least 3 characters'}
                                {form.username.length > 8 && 'Username must be no more than 8 characters'}
              </span>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                minLength="6"
                                maxLength="15"
                            />
                            <span className="label-text-alt text-sm text-red-500">
                {form.password.length < 6 && 'Password must be at least 6 characters'}
                                {form.password.length > 15 && 'Password must be no more than 15 characters'}
              </span>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label" htmlFor="confirmPassword">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="cursor-pointer flex items-center">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={form.termsAccepted}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary mr-2"
                                />
                                <span className="label-text">I accept the terms and conditions</span>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h2 className="text-lg font-bold mb-4">Error</h2>
                            <p>{errorMessage}</p>
                            <div className="modal-action">
                                <button onClick={handleCloseModal} className="btn">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUpPage;
