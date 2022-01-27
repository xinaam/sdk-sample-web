import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

interface PropTypes {
  setAllowProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetTransactionHistory = ({ setAllowProceed }: PropTypes) => {
  const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const payload = { page: 1, items: 20 };
      const response = await window.MzaaloSDK.getBalanceTransactions(payload);
      if (response.success) {
        toast.success("Get Transaction History Successful");
        setShowInitSuccessMsg(true);
        setAllowProceed(true);
        setResponse(response?.data);
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="init-container">
      {showInitSuccessMsg ? (
        <>
          <h4>Get Transaction History Successful.</h4>
          {/* TODO: map response array */}
        </>
      ) : (
        <>
          <form className="form text-center" onSubmit={onSubmit}>
            <div className="text-center">
              <LoadingButton
                className="my-3"
                variant="outlined"
                color="primary"
                type="submit"
                loading={isLoading}
              >
                Get Transaction History
              </LoadingButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default GetTransactionHistory;
