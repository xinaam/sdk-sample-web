import React from 'react';
import Balance from './Balance';
import RegisterAction from './RegisterAction';

function RewardSection (props) {

    return (
        <div className="reward-container">
            {/* <h3>Step 3 : Register Reward and Fetch Balance</h3> */}
            <div className="flex">
                <RegisterAction />
                <Balance />
            </div>
        </div>

    );
}

export default RewardSection;