import React from "react";
import { API } from "../../backend";

const DocumentHelper = ({ document, type }) => {
  const imageurl=`https://prod.wp.cdn.aws.wfu.edu/sites/93/2020/02/document-icon.png`
  const docurl = document
    ? `${API}/patient/document/${document._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  return (
    <div>
    <div className="rounded border border-dark">
        <img src={imageurl} alt="photo" style={{ maxHeight: "10%", maxWidth: "50%" }} className=" rounded"/>
      </div><br/>
      <button className="btn btn-outline-info mb-3"><a href={docurl} target="_blank" style={{textDecoration:"none", color: "black"}} color="white">View File</a></button>
      </div>
  );
};



export default DocumentHelper;
