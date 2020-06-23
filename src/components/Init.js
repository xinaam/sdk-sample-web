import React, { useState } from 'react';
import { MzaaloAuth } from 'mzaalo-web-sdks';
import {ToastsContainer, ToastsStore} from 'react-toasts';

function Init (props) {

    const [partnerCode, setPartnerCode] = useState('');
    const [mzaaloEnvironment, setMzaaloEnvironment] = useState('');
    const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false)

    const handlePartnerCodeChange = (e) => {
        setPartnerCode(e.target.value)
    }

    const handleMzaaloEnvironment = (e) => {
        setMzaaloEnvironment(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!partnerCode || !mzaaloEnvironment)
            return ToastsStore.error("Fields cannot be blank")
        MzaaloAuth.init(partnerCode, mzaaloEnvironment)
        .then(res => {
            ToastsStore.success("Init Successfully")
            setShowInitSuccessMsg(true)
        })
        .catch (error => ToastsStore.error(error))
    }

    return (
        <div className="init-container">
        {/* <h3>Step 1 : Initialize the SDK</h3> */}
        {
            showInitSuccessMsg ?
            <h4>Initailization Successfull. Please login to continue</h4>
            :
            <form className="form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Partner Code</label>
                <input type="text" name="partnerCode" id="partnerCode" placeholder="Enter Partner Code" onChange={(e) => handlePartnerCodeChange(e)} />
            </div>
            <div className="form-control">
                <label>Mzaalo Environment</label>
                <select name="mzaaloEnvironment" id="mzaaloEnvironment" onChange={(e) => handleMzaaloEnvironment(e)}>
                    <option value="">
                        Select Environment
                    </option>
                    <option value="STAGING">
                        Staging
                    </option>
                    <option value="PRODUCTION">
                        Production
                    </option>
                </select>
                </div>
                <button className="btn btn-main">Initialize</button>
             </form>
        }
        <ToastsContainer store={ToastsStore} />
            </div>
    );
}

export default Init;