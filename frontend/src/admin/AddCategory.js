import React,{useState} from "react";
import { Link } from "react-router-dom";


import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);



    const {patient, token} = isAuthenticated();
    


    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Dashboard</Link>
        </div>

    );


    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };


    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // backend request fired
        createCategory(patient._id, token, {name} )
        .then(data => {
            if(data.error) {
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setName("");
            }
        });
    };


    const successMessage = () => {
        if(success) {
            return <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    ><h4>Category created successfully</h4></div>
         
        }
    };


    const warningMessage = () => {
        if(error) {
            return <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    ><h4>Failed to create category</h4></div>
         
        }

    };




    const myCategoryForm = () => (
      <form autoComplete="off" >
          <br /><h3><span>Enter the category</span></h3>
          <div className="form-group">
              <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required="required" placeholder="Category of documents" />
              <button onClick={onSubmit} className="btn btn-outline-info"> Create Category</button>
          </div>
      </form>  
    );


    return (
        <div>
            <Base 
                src1="/logo.png" 
                title="Create a category here"
                description="Add a type (category) of document for patients"
                className="container p-4"
            >
                <div className="row bg-white rounded">
                    <div className="col-md-8 mb-2 offset-md-2">
                        {successMessage()}
                        {warningMessage()}
                        {myCategoryForm()}
                        {goBack()}
                    </div>
                </div>
            </Base>
            
        </div>
    );
};


export default AddCategory;