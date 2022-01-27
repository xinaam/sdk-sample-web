import React, { useState } from "react";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PropTypes {
  setAllowProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout = ({ setAllowProceed }: PropTypes) => {
  const [guestUserId, setGuestUserId] = useState("");
  const [geoCode, setGeoCode] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!guestUserId) return toast.error("Please enter guest user id");
      const payload = {
        guestUserId,
        geoCode,
      };
      const response = await window.MzaaloSDK.logout(payload);
      if (response.success) {
        toast.success("Logout Successful");
        setShowSuccessMsg(true);
        setAllowProceed(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="init-container">
      {showSuccessMsg ? (
        <h4>Logout Successful.</h4>
      ) : (
        <>
          <div className="text-center">
            <h3>Logout and Register as Guest</h3>
          </div>
          <form className="form text-center" onSubmit={onSubmit}>
            <div className="form-control mt-2 mb-3">
              <TextField
                required
                variant="outlined"
                type="text"
                name="guestUserId"
                id="guestUserId"
                placeholder="Guest User Id"
                value={guestUserId}
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
                className="my-3"
                variant="outlined"
                color="primary"
                type="submit"
                disabled={guestUserId.length === 0}
              >
                Logout
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Logout;
