import { API } from "../../backend";
import axios from "axios";

export const getPatientForGuest = async ({upi:upi}) => {
    //console.log(upi)
    const UPI = JSON.stringify({ "upi": upi});
    /*console.log({upi: upi} , "fghj  ", " ", upi)
    let patient = await axios.post(`${API}/guest/patient/`, {upi: upi}).then(response=> {
        //response.json()
        return response
        console.log(response);
    })
    .catch(err=>{
        console.log(err)
    })
    console.log(patient)*/
    
   await axios.post(`${API}/guest/patient/`, UPI ,{
        headers: {
        'content-type': 'application/json'
        }
        
        })
        .then(response=> {
        
        console.log(response);
        
        })
        
        .catch(error=> {
        
        console.log(error);
        
        });
        
    
    /*return fetch(`${API}/guest/patient/`,{
    method: "POST",
    //mode: 'no-cors',
    body: upi
    })
    .then(response=> {
        response.json()
        console.log(response);
    })
    .catch(err=>{
        console.log(err)
    })*/
    
    
    
    //console.log({upi})
    //console.log(JSON.stringify({upi}))
    /*return (`${API}/guest/patient`, {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify({upi})
        //body: JSON.stringify(upi)
    })
    .then(response => {
        response.json();
    })
    .catch(err => { 
        console.log(err)
    });*/
};


export const getCategoryById = (categoryId) => {
    return fetch(`${API}/categories/:${categoryId}`, {method: "GET"})
    .then(response=> {
        return response.json()
    })
    .catch(err=> {
        console.log(err)
    });

}
//categories/:categoryId