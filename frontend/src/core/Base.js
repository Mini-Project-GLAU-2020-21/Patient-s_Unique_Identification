import React, { Children } from 'react'
import Menu from './Menu';


const Base = ({
    title="My Tiltle",
    description="description",
    className="bg-light text-dark p-4",
    children 
}) => {
    return (
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid text-center text-white">
                    <h4> For any queries </h4>
                    <button className="btn btn-danger btn-lg py-1">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        Place to manage all your <span className="text-warning">Medical Adherence</span>
                    </span>
                </div>
            </footer>
        </div>
    )
}


export default Base;