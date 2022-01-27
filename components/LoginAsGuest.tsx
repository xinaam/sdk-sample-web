import React, { useState } from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface PropTypes {
  setAllowProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginAsGuest = ({ setAllowProceed }: PropTypes) => {
  const [guestUserId, setGuestUserId] = useState("");
  const [geoCode, setGeoCode] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!guestUserId) return toast.error("Please enter guest user id");
      const payload = {
        guestUserId,
        geoCode,
      };
      const response = await window.MzaaloSDK.guestLogin(payload);
      if (response.success) {
        toast.success("Guest Login Successful");
        setShowSuccessMessage(true);
        setAllowProceed(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="init-container">
      {showSuccessMessage ? (
        <h4>Login As Guest Successful.</h4>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <div className="form-control">
            <TextField
              variant="outlined"
              type="text"
              name="guestUserId"
              id="guestUserId"
              value={guestUserId}
              placeholder="Guest User Id"
              onChange={(e) => setGuestUserId(e.target.value)}
            />
          </div>
          <div className="pt-2 form-control">
            <TextField
              variant="outlined"
              type="text"
              name="geoCode"
              id="geoCode"
              value={geoCode}
              placeholder="Geo Code (optional)"
              onChange={(e) => setGeoCode(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button
              className=" my-3"
              variant="outlined"
              color="primary"
              type="submit"
              disabled={guestUserId.length === 0}
            >
              Login As Guest
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginAsGuest;
