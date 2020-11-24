import React from 'react'
import DocumentHelper from './helper/DocumentHelper';


const Card = ({document}) => {
  const cardTitle = document.categoryName
  const cardDescription = document.by_doctor_name
  const id = document._id
    return (
      <div>
      <div className="card text-black bg-light  mb-1 ">
        <div className="card-header lead"><h5>Document Type: <b>{cardTitle}</b></h5></div>
        <div className="card-body">
        <DocumentHelper document={document} /><br/>
          <p className="lead bg-warning text-dark font-weight-normal text-wrap">Prescribed/Tested By: <b>{cardDescription}</b> </p>
        </div>
      </div>
      <br/><br/><br/><br/>
      </div>
      
    );
  };

export default Card;