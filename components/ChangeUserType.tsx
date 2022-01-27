import React, { useEffect, useState } from "react";
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

const ChangeUserType = ({ setAllowProceed }: PropTypes) => {
  const [userType, setUserType] = useState("FREE");
  const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false);
  useEffect(() => setAllowProceed(true), []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await window.MzaaloSDK.setUserType(userType);
      if (response.success) {
        toast.success("Change User Type Successful");
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
        <h4>Change User Type Successful.</h4>
      ) : (
        <>
          <form className="form text-center" onSubmit={onSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="User Type"
                onChange={(e: SelectChangeEvent) => setUserType(e.target.value)}
              >
                <MenuItem value={"FREE"}>FREE</MenuItem>
                <MenuItem value={"PREMIUM"}>PREMIUM</MenuItem>
              </Select>
            </FormControl>
            <div className="text-center">
              <Button
                className="my-3"
                variant="outlined"
                color="primary"
                type="submit"
              >
                Change User Type
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChangeUserType;
