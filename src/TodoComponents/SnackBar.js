import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function SimpleSnackbar({ open, message }) {
  return (
    <div>
      <Snackbar
        open={open}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          className:
            "!bg-green-600 !text-white !font-bold !shadow-lg !rounded-lg !text-center",
        }}
      />
    </div>
  );
}
