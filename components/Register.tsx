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

const Register = ({ setAllowProceed }: PropTypes) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("91");
  const [partnerUserId, setPartnerUserId] = useState("");
  const [userType, setUserType] = useState("FREE");
  const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!email && !phone)
        return toast.error("Please enter email or phone number");
      if (phone && !phoneCountryCode)
        return toast.error("Please enter phone country code");
      if (phone && !phone.match(/^[0-9]{10}$/))
        return toast.error("Please enter valid phone number");
      if (phoneCountryCode && !phoneCountryCode.match(/^[0-9]*$/))
        return toast.error("Please enter valid phone country code");
      if (!partnerUserId) return toast.error("Please enter partner user id");
      const payload = {
        email,
        phone,
        phoneCountryCode,
        partnerUserId,
        userType,
      };
      const response = await window.MzaaloSDK.register(payload);
      if (response.success) {
        toast.success("Register Successful");
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
        <h4>Registration Successful.</h4>
      ) : (
        <>
          <div className="text-center">
            <h4>Enter Email / Phone + Country Code</h4>
          </div>
          <form className="form text-center" onSubmit={onSubmit}>
            <div className="form-control my-2">
              <TextField
                variant="outlined"
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control my-2">
              <TextField
                variant="outlined"
                type="text"
                name="phone"
                id="phone"
                value={phone}
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control my-2">
              <TextField
                variant="outlined"
                type="text"
                name="phoneCountryCode"
                id="phoneCountryCode"
                placeholder="Phone Country Code"
                value={phoneCountryCode}
                onChange={(e) => setPhoneCountryCode(e.target.value)}
              />
            </div>
            <div className="form-control mt-2 mb-3">
              <TextField
                required
                variant="outlined"
                type="text"
                name="partnerUserId"
                id="partnerUserId"
                placeholder="Partner User Id"
                value={partnerUserId}
                onChange={(e) => setPartnerUserId(e.target.value)}
              />
            </div>
            <FormControl>
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
                className=" my-3"
                variant="outlined"
                color="primary"
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
