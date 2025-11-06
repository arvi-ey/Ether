import React from 'react'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Account = () => {
    const location = useLocation()
    const params = useParams()
    console.log(params, "Params")
    const { id } = location.state || {};
    console.log(id, "ID")
    return (
        <div>Account</div>
    )
}

export default Account