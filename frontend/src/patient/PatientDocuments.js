import React, {useState, useEffect} from 'react';
import Base from "../core/Base";
import Card from '../core/Card';
import { viewAllDocuments } from './helper/patientapicalls';
import  { isAuthenticated } from "../auth/helper/index";

const PatientDocuments = () => {
    const { patient, token } = isAuthenticated();
    const [documents, setDocuments] = useState([])

    const [error, setError] = useState()
 
    const loadAllDocuments = () => {
        console.log(patient._id);
        viewAllDocuments(patient._id, token)
        .then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setDocuments(data);
            }
        })
        .catch(err => {
            return console.log(err);
        });
    };
    const errorMessage = () => {
        return (
          <div className="row ml-5 mb-5 mt-5">
            <div className="col-md-12 offset-sm-2 text-right mb-5">
              <div
                className="alert alert-danger mb-5"
                style={{ display: error ? "" : "none" }}
              >
                <h2>{error}</h2>
                
              </div>
            </div>
            
          </div>
        );
      };

    useEffect(() => {
        loadAllDocuments()
        errorMessage()
    }, [])
    
    return (
        <Base src1="../logo.png" title="Your Documents" description="">
            <div className="row text-center">
                <h1 className="text-white"></h1>  
                <div className="row">
                {errorMessage()}
                       {documents.map((document, index) => {
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card document={document}/>
                            </div>
                        )
                    })} 
                    
                </div>       
            </div>
        </Base>
    );
}

export default PatientDocuments;