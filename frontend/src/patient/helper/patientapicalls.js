import { API } from "../../backend";


// view own details call
export const getPatientByOwn = (patientId, token, patient) => {
    return fetch(`${API}/patient/myProfile/${patientId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(patient)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => { 
        return console.log(err)
    });
};

// update patient
export const updatePatient = (patientId, token, patient) => {
    console.log(JSON.stringify(patient))
    return fetch(`${API}/patient/editProfile/${patientId}`,{
        method: "PUT",
        headers: {
           Authorization: `Bearer ${token}`,
           //"Content-Type": "application/json",
           Accept: "application/json"
        },
        body:JSON.stringify(patient)
    })
    .then(response => {
        return response.json();
    })
    .catch(err=> {
        return console.log(err)
    });
};








// get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => { 
        console.log(err)
    });
  };



// upload a document
export const uploadaDocument = (patientId, token, document) => {
    return fetch(`${API}/patient/uploadDocument/${patientId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: document
    })
    .then(response => {
        return response.json();
    })
    .catch(err => { 
        return console.log(err);
    });
};




// view all documents
export const viewAllDocuments = (patientId, token) => {
    return fetch(`${API}/patient/allDocuments/${patientId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response=> {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const documentDisplay = (documentId) => {
    return fetch(`${API}/patient/document/${documentId}`,{
        method: "GET"
    })
    .then(response => {
        //fs.writeFile(response.fileName, response.document_file.data)
        
        console.log("response::::",response,":::::response");
        //console.log("response.bdy: ",response.body);
        return; //response.json();
    })
    .catch(error =>{
        console.log(error);
    })
}













/*
// get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };







// product calls

// create a product
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// get all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
    .then(response=> {
        return response.json();
    })
    .catch(err => console.log(err));
};


// delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};



// get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response=> {
        return response.json();
    })
    .catch(err => console.log(err));
};


// update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
*/