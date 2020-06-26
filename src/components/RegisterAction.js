import React, { useState } from 'react';
import { MzaaloRewards } from 'mzaalo-web-sdks';
import { ToastsContainer, ToastsStore } from 'react-toasts';

function RegisterAction (props) {

    const [rewardActionType, setRewardActionType] = useState('');
    const [eventMeta, setEventMeta] = useState({});
    const [showRegisterRewardMsg, setShowRegisterRewardMsg] = useState(false);

    const onActionTypeChange = (e) => {
        setRewardActionType(e.target.value)
    }

    const onEventMetaChange = (e) => {
        setEventMeta(e.target.value)
    }

    const isValideJSON = (eventMeta) => {
        try {
            JSON.parse(eventMeta)
        } catch (e) {
            return false;
        }
        return true;
     }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!rewardActionType) {
            return ToastsStore.error('Please Select Reward Action Type')
        }

        if (eventMeta.length > 0 && !isValideJSON(eventMeta)) {
            return ToastsStore.error("Invalid JSON Object")
        }

        var parsedEventMeta = eventMeta;
        if (eventMeta.length > 0) {
            parsedEventMeta = JSON.parse(eventMeta);
        }

        MzaaloRewards.registerRewardAction(rewardActionType, parsedEventMeta)
        .then(res => {
            setShowRegisterRewardMsg(true)
            ToastsStore.success("Action Registered Successfully")
        })
        .catch(error => ToastsStore.error(error))

    }

    // Function return true if need to have json object else return false
    // function getEventMetaData (actionType) {
    //     switch (actionType) {
    //         case 'CONTENT_VIEWED' : return true;
    //         case 'CHECKED_IN' : return false;
    //         case 'SIGNED_UP' : return false;
    //         case 'REFERRAL_APPLIED' : return true;
    //         default : return false;
    //     }
    // }


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
                                <option value="SIGNED_UP">
                                    SIGNED_UP
                                </option>
                                <option value="REFERRAL_APPLIED">
                                    REFERRAL_APPLIED
                                </option>
                            </select>
                        </div> 
                        <div className="form-control">
                            <label>Event Meta Object</label>
                            <textarea name="eventMeta" id="eventMeta" rows={3} placeholder="Enter Event Meta JSON Object" onChange={onEventMetaChange} />
                        </div>
                        <button className="btn btn-main">Register</button>
                    </form>
            }
        </div>
        <ToastsContainer store={ToastsStore} />
        </>
    );
}

export default RegisterAction;