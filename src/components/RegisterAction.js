import React, { useState } from 'react';
import { MzaaloRewards } from 'mzaalo-web-sdks';
import { ToastsContainer, ToastsStore } from 'react-toasts';

function RegisterAction (props) {

    const [rewardActionType, setRewardActionType] = useState('');
    const [metaData, setMetaData] = useState('');
    const [showRegisterRewardMsg, setShowRegisterRewardMsg] = useState(false);

    const onActionTypeChange = (e) => {
        setRewardActionType(e.target.value)
    }

    const onMetaDataChange = (e) => {
        setMetaData(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // const metaKey = getEventMetaData(rewardActionType);
        let eventMeta = {
            meta : {
                metaKey : metaData
            }
        }
        console.log(rewardActionType, eventMeta)
        MzaaloRewards.registerRewardAction(rewardActionType, eventMeta)
        .then(res => {
            setShowRegisterRewardMsg(true)
            ToastsStore.success("Action Registered Successfully")
        })
        .catch(error => ToastsStore.error(error))

    }

    function getEventMetaData (actionType) {
        switch (actionType) {
            case 'CONTENT_VIEWED' : return 'total_watch_time';
            case 'CHECKED_IN' : return null;
            case 'SIGN_UP' : return null;
            case 'REFERRAL_APPLIED' : return 'referee_user_id';
            default : return null;
        }
    }

    return (
        <>
        <div className="rewardAction-container">
            {
                showRegisterRewardMsg ?
                <h4>Action Registered Successfully</h4>
                :
                <form className="form" onSubmit={onSubmit}>
                    <h4>Register Reward Action Type</h4>
                        <div className="form-control">
                            <label>Reward Action Type</label>
                            <select name="rewardActionType" id="rewardActionType" onChange={onActionTypeChange}>
                                <option value="">
                                    Select Action Type
                                </option>
                                <option value="CONTENT_VIEWED">
                                    CONTENT_VIEWED
                                </option>
                                <option value="CHECKED_IN">
                                    CHECKED_IN
                                </option>
                                <option value="SIGN_UP">
                                    SIGN_UP
                                </option>
                                <option value="REFERRAL_APPLIED">
                                    REFERRAL_APPLIED
                                </option>
                            </select>
                        </div>
                        {
                            getEventMetaData(rewardActionType) !== null ? 
                            <div className="form-control">
                                <label>{getEventMetaData(rewardActionType)}</label>
                                <input type="text" name="metaData" id="metaData" placeholder="Enter Meta Data Value" onChange={onMetaDataChange} />
                            </div>
                            : null
                        }
                        <button className="btn btn-main">Register</button>
                    </form>
            }
        </div>
        <ToastsContainer store={ToastsStore} />
        </>
    );
}

export default RegisterAction;