import React, { useState } from 'react';
import Base from "../core/Base";
import { Link } from 'react-router-dom';
import {getPatientForGuest} from './helper/coreapicalls'
import { API } from "../backend";
import axios from "axios";





const PatientSearchByGuest = () => {
    const [values, setValues] = useState({
        upi: "",
        f_name: "",
        l_name: "",
        dob: "",
        address: "",
        blood_group: "",
        r_contact_number: "",
        r_name: "",
        r_relation: "",
        success:true,
        documents: [],
        error: "",
        loading: false
    })
    const { upi, f_name, l_name, dob, address, r_relation, r_name, r_contact_number, blood_group, success, documents } = values;

    const handleChange = event => {
        event.preventDefault();
        setValues({...values, error: false, [event.target.name]: event.target.value});
    }

    const onSubmit = event => {
        /*let patient = {}
        console.log({"upi": upi})
        //console.log({"event.upi": event.upi})
        patient = await fetch(`${API}/guest/patientt/${upi}`)
        //axios.get(`${API}/guest/patientt/`+ upi)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });*/
        
        
        //getPatientForGuest(upi)
        getPatientForGuest({upi: upi})
        .then((data) => {
            const patient = data
            //console.log(patient)
            if(data.error) {
                //console.log(data)
                setValues({...values, error: data.error, loading: false})
            } 
            else {
                    setValues({
                        ...values,
                        success:true,
                        didRedirect: true
                    });
            }
        })
        .catch(() => {
            console.log("There is some error")
        })
        //console.log(patient)
    }

    /*const patientDetails = () =>{
        if(success) {
            
    }
    }*/
    
        const upiSearchForm = () => {
            return (
                <form autoComplete="off" >
                    <div style={{float: "left"}}>
                        <input onChange={handleChange} type="number" name="upi" placeholder="Search UPI" />
                    </div>
                    <div style={{float: "right"}}>
                        <button className="btn-outline-success" onClick={onSubmit} >Search</button>
                    </div>
                </form>
            );
        };
    
    return(
        <Base src1="../logo.png" title="Search Patient" description="Search for a patient" className="container  p-5">
            <div className="row bg-light text-dark rounded">
                <div className="col-md-10 offset-md-1 px-5 py-5">
                <h2 className="text-left">Patient's UPI :</h2><br/><br/>
                    {upiSearchForm()}
                </div>
            </div><br/><br/>
            <div className="row bg-light text-dark rounded">
                    <div className="col-md-10 offset-md-1 px-5 py-5">
                        <h2 className="card-header text-center">Patient Information</h2>
                        <ul className="list-group">
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> UPI: </span>{upi}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> First Name: </span>{f_name}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> Last Name: </span>{l_name}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> Blood Group: </span>{blood_group}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> Date of Birth :</span>{dob}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4">Address:</span>{address}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> Relative Name: </span>{r_name}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> Relation with relative: </span>{r_relation}</h4>
                        </li>
                        <li className="list-group-item">
                            <h4><span className="badge badge-info mr-4"> Relative Contact Number: </span>{r_contact_number}</h4>
                        </li>
                    </ul>
                    </div>
            </div>
        </Base>
    );
};

export default PatientSearchByGuest;