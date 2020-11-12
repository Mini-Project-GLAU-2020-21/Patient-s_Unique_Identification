import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import Base from '../core/Base';


const Signup = () => {


    const [values, setValues] = useState({
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        dob: "",
        p_contact_number: "",
        error: "",
        success: false
    });

    const {f_name, l_name, email, password, dob, p_contact_number, error, success} = values;

    
    const handleChange = field_name => event => {
        setValues({...values, error: false, [field_name]: event.target.value});
    }


    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({f_name, l_name, email, password, dob, p_contact_number})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({
                    f_name: "",
                    l_name: "",
                    email: "",
                    password: "",
                    dob:"",
                    p_contact_number: "",
                    error: "",
                    success: true
                });
            }
        })
        .catch(console.log("Error in creating new account"));
        
    }

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="text-dark">First Name</label>
                                    <input className="form-control" onChange={handleChange("f_name")} type="text" value={f_name} placeholder="First Name"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="text-dark">Last Name</label>
                                    <input className="form-control" onChange={handleChange("l_name")} type="text" value={l_name} placeholder="Last Name (optional)"/>
                                </div>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
                        </div>
                        <div className="form-group">
                                <label className="text-dark">Password</label>
                                <input className="form-control" onChange={handleChange("password")} type="password" value={password}/>
                        </div>


                        <div className="form-group">
                            <label className="text-dark">Date of Birth</label>
                            <input className="form-control" onChange={handleChange("dob")} type="date" min="2000-02-15" max="2020-11-05" value={dob}/>
                        </div>
                        

                        <div className="form-group">
                            <label className="text-dark">Contact Number</label>
                            <input className="form-control" onChange={handleChange("p_contact_number")} type="text" value={p_contact_number}/>
                        </div>

                        
                       {/*<div className="form-group">
                            <label className="text-dark">Blood Group</label>
                            <input className="form-control" type="text"/>
                        </div>

                        <div className="form-group">
                            <label className="text-dark">Address</label>
                            <input className="form-control" type="text"/>
                        </div>

                        <h3>Emergency Contact</h3>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="text-dark">Name</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="text-dark">Relation</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="text-dark">Contact Number</label>
                                    <input className="form-control" type="text"/>
                                </div>
                            </div>
                        </div>
                        */}
                        
                        

                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }


    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                Your account created successfully. Please{" "}
                <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
    

    return(
        <Base title="Create New Account" description="Enter your details" >
        {signUpForm()}
        {successMessage()}
        {errorMessage()}
        <p className="text-white text-center">hi</p>
        </Base>
    );
};

export default Signup;
