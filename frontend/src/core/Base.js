import React, { Children } from 'react'
import Menu from './Menu';
import { Link } from "react-router-dom";


const Base = ({
    title="My Tiltle",
    description="description",
    className=" text-dark p-4",
    children 
}) => {
    return (
        <div>
            <Menu/>
            <header className="footer bg-dark mt-auto py-3">
                <div className="container-fluid text-center text-white">
                <br /><br />
                    <h1 style={{fontSize:"50px"}}>{title}</h1>
                    <p className="lead">{description}</p><br /><br />
                </div>
            </header>
            <div className={className}>{children}</div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid text-center text-white">
                    <h4> For any queries </h4>
                    <button className="btn btn-danger btn-lg py-1"><Link style={{ textDecoration: 'none', color: "black" }} to="/ContactUs">Contact Us</Link></button>
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