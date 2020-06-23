import React, { useState } from 'react';
import { MzaaloRewards } from 'mzaalo-web-sdks';
import { ToastsContainer, ToastsStore } from 'react-toasts';

function Balance (props) {

    const [balance, setBalance] = useState('')

    const fetchBalance = () => {
        MzaaloRewards.getBalance()
        .then(res => {
            setBalance(res)
            ToastsStore.success("Balance Fetched")
        })
        .catch(error => ToastsStore.error(error))
    }

    return (
        <>
        <div className="balance-container">
            <h4>Fetch User Balance</h4>
            <button className="btn btn-main" onClick={fetchBalance}>Fetch Balance</button>
            <div className="balance">
                {balance}
            </div>
        </div>
        <ToastsContainer store={ToastsStore} />
        </>
    );
}

export default Balance;