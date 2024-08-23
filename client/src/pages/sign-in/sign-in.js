import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
    const [form, setForm] = useState({
        identifier: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.identifier || !form.password) {
            setErrorMessage('Username/Email and password are required.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.post('/api/auth/sign-in', form);
            navigate("/user/profile");
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
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
                    <h2 className="text-center text-2xl font-bold">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="identifier">
                                <span className="label-text">Username or Email</span>
                            </label>
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={form.identifier}
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
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal modal-open max-w-md mx-auto">
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

export default SignInPage;
