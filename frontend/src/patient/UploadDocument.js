import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories, uploadaDocument } from "./helper/patientapicalls";
import  { isAuthenticated } from "../auth/helper/index";

const UploadDocument = () => {
  const { patient, token } = isAuthenticated();

  const [values, setValues] = useState({
    by_doctor_name: "",
    document_file: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    uploadedDocument: "",
    formData: ""
  });

  const { by_doctor_name, categories, category, loading, error, uploadedDocument, formData } = values;

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true, uploadedDocument:false });
    uploadaDocument(patient._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, uploadedDocument:false });
      } else {
        setValues({
          ...values,
          by_doctor_name: "",
          document_file: "",
          category: "",
          error:"",
          uploadedDocument: true,
          loading: false
        });
      }
    })
    .catch(() => {
      return {error: true}})
  };

  const handleChange = name => event => {
    const value = name === "document_file" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, error: false ,[name]: value });
  };
  const loadingMessage = () => {
    return (
      loading && (
          <div className="alert alert-info">
              <h2>Loading...</h2>
          </div>
      )
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



  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: uploadedDocument ? "" : "none" }}
    >
      <h4>Document uploaded successfully</h4>
    </div>
  );

  const uploadDocumentForm = () => (
    <form autoComplete="off">
      <br /><h3><span>Upload your Document</span></h3><br />
      <div className="form-group"><h5>Prescribed/Tested by :</h5>
        <input
          onChange={handleChange("by_doctor_name")}
          name="document_file"
          className="form-control"
          placeholder="Doctor's name"
          type="text"
          value={by_doctor_name}
        />
      </div><br />
      
      <div className="form-group">
       <h5>Category of document :</h5>
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category" 
          value={category}
        >
         <option value="" selected="selected" disabled="disabled">Select</option>
          {categories &&
            categories.map((categ, index) => (
              <option key={index} value={categ._id}>
                {categ.name}
              </option>
            ))}
        </select>
      </div><br />
      <div className="form-group">
        <h5>Document File : </h5>
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("document_file")}
            type="file"
            name="document_file"
            accept=".pdf"
            placeholder="choose a file"
          />
        </label>
      </div><p>Max. Size of file should be below 2.5 MB </p>

        <div className="text-right">
            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Upload
            </button>
        </div>
    </form>
  );

  return (
    <Base
    src1="../logo.png"
      title="Document upload section"
      description="You can upload your documents here"
      className="container  p-5"
    >

      <div className="row bg-light text-dark rounded">
        <div className="col-md-10 offset-md-1 px-5 py-5">
          {loadingMessage()}
          {errorMessage()}
          {successMessage()}
          {uploadDocumentForm()}
        </div>
      </div>
    </Base>
  );
};

export default UploadDocument;
