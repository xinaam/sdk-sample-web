import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

interface PropTypes {
  setAllowProceed: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetRewardOffers = ({ setAllowProceed }: PropTypes) => {
  const [showInitSuccessMsg, setShowInitSuccessMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await window.MzaaloSDK.getRewardOffers();
      if (response.success) {
        toast.success("Get Reward Offers Successful");
        setShowInitSuccessMsg(true);
        setAllowProceed(true);
        setResponse(response?.data?.data);
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const columns: GridColDef[] = [
    {
      field: "brand_name",
      headerName: "brand_name",
    },
    // {
    //   field: "category_child",
    //   headerName: "category_child",
    // },
    // {
    //   field: "category_name",
    //   headerName: "category_name",
    // },
    // {
    //   field: "category_parent",
    //   headerName: "category_parent",
    // },
    // {
    //   field: "company_logo",
    //   headerName: "company_logo",
    // },
    // {
    //   field: "coupon_company",
    //   headerName: "coupon_company",
    // },
    // {
    //   field: "coupon_details",
    //   headerName: "coupon_details",
    // },
    // {
    //   field: "coupon_discount",
    //   headerName: "coupon_discount",
    // },
    // {
    //   field: "coupon_how_to_redeem",
    //   headerName: "coupon_how_to_redeem",
    // },
    // {
    //   field: "coupon_parent",
    //   headerName: "coupon_parent",
    // },
    // {
    //   field: "coupon_rate",
    //   headerName: "coupon_rate",
    // },
  ];
  return (
    <div className="">
      {showInitSuccessMsg ? (
        <div className="my-3">
          <h4>Get Reward Offers Successful.</h4>
          {!!response?.length && (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={response}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          )}
        </div>
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
                Get Reward Offers
              </LoadingButton>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default GetRewardOffers;
