import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to Proyectum</h1>
                    <p className="py-6">
                        Welcome to MyWebsite, the ultimate tool for managing your projects efficiently using the Kanban method.
                        Organize your tasks, assign responsibilities, and track your team's progress in real-time.
                        With an intuitive and customizable interface, MyWebsite lets you visualize every stage of your projects,
                        ensuring that nothing falls through the cracks. Sign up now and take your team's productivity
                        to the next level.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/sign-in" className="btn btn-primary mr-4">Sign In</Link>
                        <Link to="/sign-up" className="btn btn-outline ">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;