import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

interface PropTypes {
  setAllowProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetBalance = ({ setAllowProceed }: PropTypes) => {
  const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await window.MzaaloSDK.getBalance();
      if (response.success) {
        toast.success("Get Balance Successful");
        setShowInitSuccessMsg(true);
        setAllowProceed(true);
        setResponse(response?.data?.balance);
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
          <h4>Get Balance Successful.</h4>
          <h5>Balance is {response}</h5>
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
                Get Balance
              </LoadingButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default GetBalance;
