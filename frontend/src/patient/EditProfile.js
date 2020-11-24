import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import {updatePatient, getPatientByOwn} from "./helper/patientapicalls"

const UpdatePatient = () => {
  const { patient, token } = isAuthenticated();
  const [values, setValues] = useState({
    r_name: "",
    r_contact_number:"",
    r_relation: "",
    error: "",
    loading: false,
    success: false
  });

  const{  r_name, r_contact_number, r_relation, address, error, loading, success} = values;

  const handleChange = field_name => event => {
    setValues({...values, error: false, [field_name]: event.target.value});
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    console.log({ r_name, r_contact_number,  r_relation})
    updatePatient(patient._id, token, { r_name, r_contact_number, r_relation})
    .then(data => {
        if(data.error){
            setValues({...values, error: data.error, success: false});
        } 
        else {
            setValues({
              r_name: "",
              r_contact_number:"",
              r_relation: "",
              error: "",
              success: true
            });
        }
    })
    .catch(()=>{
        return console.log("Error in updating your details")
    });
  }


  const successMessage = () => {
    return (
    <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Details updated successfully.
          </div>
        </div>
    </div>);
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




  const updatePatientForm = () => (
    <form>
      {/*<div className="form-group">UPI: 
        <input className="form-control" value={upi} readOnly="readOnly" />
      </div>
      <div className="form-group">First Name:
        <input className="form-control" value={f_name} readOnly="readOnly"/>
      </div>
      
      <div className="form-group">Last Name:
        <input className="form-control" placeholder="Last Name" value={l_name} readOnly="readOnly"/>
      </div>
      
      <div className="form-group">Date of Birth:
        <input className="form-control" value={dob} readOnly="readOnly" />
      </div>
      
      <div className="form-group">Email:
        <input className="form-control" value={email} readOnly="readOnly"/>
      </div>

      <div className="form-group">Blood Group:
        <input className="form-control" value={blood_group} readOnly="readOnly" />
      </div>
      

      <div className="form-group">Contact Number:
        <input onChange={handleChange("p_contact_number")} className="form-control" value={p_contact_number}ty/>
      </div>
      
      
      
      <div className="form-group">Address:
        <input onChange={handleChange("address")} className="form-control" placeholder="Address" value={address} type="text" placeholder="Your permanent address." />
      </div>*/}
      
      <h4>Emergency Contact: </h4>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="text-dark">Relative's Name</label>
                                    <input onChange={handleChange("r_name")} placeholder="Name of relative" type="text" value={r_name} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="text-dark">Relation with Relative</label>
                                    <input onChange={handleChange("r_relation")} type="text" placeholder="Relation with relative" value={r_relation} className="form-control"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="text-dark">Relative's Contact Number</label>
                                    <input onChange={handleChange("r_contact_number")} placeholder="Contact number of relative" type="number" value={r_contact_number} className="form-control"/>
                                </div>
                            </div>
                        </div>
      
      
      
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Profile
      </button>
    </form>
  );
  return (
    <Base title="Update your profile here" description="Enter your details" className="container  p-5">
      <div className="row bg-light text-dark rounded">
        <div className="col-md-10 offset-md-1 px-5 py-5">
          {successMessage()}
          {errorMessage()}
          {updatePatientForm()}
        </div>
      </div>
    </Base>
  );
};






















/*const UpdatePatient = () => {
  const { patient:{_id, f_name, l_name, email, p_contact_number, r_contact_number, r_name, r_relation , address, blood_group, upi, dob , role}, token } = isAuthenticated();

  const [values, setValues] = useState({
    f_name: f_name,
    l_name: l_name,
    email: email,
    upi: upi,
    p_contact_number: p_contact_number,
    dob: dob,
    address: address,
    r_name: r_name,
    r_relation: r_relation,
    r_contact_number: r_contact_number,
    blood_group: blood_group,
    loading: false,
    error: "",
    updatedPatient: "",
    getaRedirect: false
  });

  const {
    /*f_name,
    l_name,
    email,
    upi,
    p_contact_number,
    dob,
    address,
    r_name,
    r_relation,
    r_contact_number,
    blood_group,
    loading,
    error,
    updatedPatient,
    getaRedirect
  } = values;

  const preload = (patientId) => {
    getPatientByOwn(patientId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ 
            ...values,
            f_name: data.f_name,
            l_name: data.l_name,
            dob: data.dob,
            p_contact_number: data.p_contact_number,
            r_relation: data.r_relation,
            r_contact_number: data.r_contact_number,
            r_name: data.r_name,
            address: data.address,
            blood_group: data.blood_group,
            email: data.email,
            upi: data.upi            
        });
      }
    });
  };


  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updatePatient(_id, token, {f_name, l_name, email, upi, p_contact_number, dob, address, r_name, r_relation, r_contact_number, blood_group, loading, error, updatedPatient, getaRedirect})
    .then(data => {
      if (data.error) {
        setValues({ ...values});
      } 
      else {
        setValues({
          ...values,
          f_name: data.f_name,
          l_name: data.l_name,
          email: data.email,
          upi: data.upi,
          p_contact_number: data.p_contact_number,
          dob: data.dob,
          address: data.address,
          r_name: data.r_name,
          r_relation: data.r_relation,
          r_contact_number: data.r_contact_number,
          blood_group: data.blood_group,
          loading: false,
          updatedPatient: true
        });
      }
    });
  };

  const handleChange = field_name => event => {
    setValues({ ...values, [field_name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: updatedPatient ? "" : "none" }}
    >
      <h4>updated successfully</h4>
    </div>
  );

  



  return (
    <Base
      title="Update your profile"
      description=""
      className="container bg-info p-4"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {updatePatientForm()}
        </div>
      </div>
    </Base>
  );
};*/

export default UpdatePatient;
