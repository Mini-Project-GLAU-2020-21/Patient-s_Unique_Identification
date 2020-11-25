import { API } from "../../backend";


// category calls
export const createCategory = (patientId, token, category) => {
    return fetch(`${API}/category/create/${patientId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


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