import React, { useState, useReducer } from 'react';
import { MzaaloAuth } from 'mzaalo-web-sdks';
import { ToastsContainer, ToastsStore } from 'react-toasts';

function Auth (props) {

    const [showAuthSuccessMsg, setShowAuthSuccessMsg] = useState(false);
    const reducer = (state, newState) => ({ ...state, ...newState});
    const [loginDetails, setLoginDetails] = useReducer(reducer, {
        unique_id : '',
        email : '',
        country_code : '',
        mobile_number : '',
    })

    const onChange = (e) => {
        setLoginDetails ({ [e.target.name] : e.target.value })
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(loginDetails)
        if (!loginDetails.unique_id) {
            return ToastsStore.error("Fields cannot be blank")
        }
        const userMeta = {
            email: loginDetails.email || '',
            country_code: loginDetails.country_code || '',
            mobile_number: loginDetails.mobile_number || ''
        };
        MzaaloAuth.login(loginDetails.unique_id, userMeta)
        .then(res => {
            ToastsStore.success('Login Successfully')
            setShowAuthSuccessMsg(true)
        })
        .catch(error => ToastsStore.error(error))
    }

    return (
        <div className="auth-container" onSubmit={onSubmit}>
            {/* <h3>Step 2 : Login to Mzaalo System</h3> */}
        {
            showAuthSuccessMsg ? 
            <h4>Logged In Successfully.</h4>
            :
            <form className="form">
            <div className="form-control">
                <label>Unique User ID</label>
                <input type="text" name="unique_id" id="unique_id" placeholder="Enter Unique User ID" onChange={onChange} />
            </div>
            <div className="form-control">
                <label>Email</label>
                <input type="email" name="email" id="email" placeholder="Enter User Email Address" onChange={onChange} />
            </div>
            <div className="form-control">
                <label>Country Code</label>
                <input type="text" name="country_code" id="country_code" placeholder="Enter Valid Country Code" onChange={onChange} />
            </div>
            <div className="form-control">
                <label>Mobile Number</label>
                <input type="number" name="mobile_number" id="mobile_number" placeholder="Enter Mobile Number" onChange={onChange} />
            </div>
            <button className="btn btn-main">Login</button>
        </form>
        }
        <ToastsContainer store={ToastsStore} />
        </div>
    );
}

export default Auth;