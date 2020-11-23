import {API} from "../../backend";


export const signup = patient => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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
export const signin = patient => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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


export const authenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}


export const signout = next => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => {
            return console.log("Signed out Successfully")
        })
        .catch(err => {
            return console.log(err)
        });
    }   
};


export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }
};