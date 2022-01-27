import React, { useState } from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface PropTypes {
  setAllowProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Init = ({ setAllowProceed }: PropTypes) => {
  const [partnerCode, setPartnerCode] = useState("");
  const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!partnerCode) return toast.error("Please enter partner code");
      const response = await window.MzaaloSDK.init(partnerCode);
      if (response.success) {
        toast.success("Init Successful");
        setShowInitSuccessMsg(true);
        setAllowProceed(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="init-container">
      {showInitSuccessMsg ? (
        <h4>Initailization Successful.</h4>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <div className="form-control">
            <TextField
              variant="outlined"
              type="text"
              name="partnerCode"
              id="partnerCode"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button
              className=" my-3"
              variant="outlined"
              color="primary"
              type="submit"
              disabled={partnerCode.length === 0}
            >
              Initialize
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Init;
