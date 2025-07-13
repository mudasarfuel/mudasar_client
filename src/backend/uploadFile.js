import axios from "axios"
// import React, {useContext} from 'react'
// import AlertContext from '../context/alert/AlertContext';

//creating file upload end point
export const FileUpload = async (file) => {
//     //Initialization of Auth Context and Alert Context
//    const alertContext = useContext(AlertContext);
//    // Destructing of set Alert function using useContext hook
//    const { setAlert, alerts } = alertContext;
    try {
        return await axios.post("http://localhost:5000/api/uploads", file).then(res => res.data)
    } catch (error) {
        //Return Error to New Packages Component
        return error.response.data
    }
}