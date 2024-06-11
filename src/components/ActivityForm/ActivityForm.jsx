import { useForm } from "react-hook-form";

import React from "react";
import {
  FormWrapper,
  SelectInput,
  TextInput,
  TimerWrapper,
} from "./ActivityForm.style";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ActivityForm = ({ onAddItem }) => {
  const { register, handleSubmit } = useForm();

  const [open, setOpen] = React.useState(false);

  const [nameValue, setNameValue] = React.useState("");
  const [timeValue, setTimeValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNameValue("");
    setTimeValue(null);
    setOpen(false);
  };

  const onSubmit = () => {
    onAddItem({
      name: nameValue,
      seconds: timeValue.$m * 60 + timeValue.$s,
    });
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new activity
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add activity
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box
            height={150}
            width={200}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={2}
          >
            <TextField
              id="outlined-basic"
              label="Activity type"
              variant="outlined"
              // {...register("activityName", { required: true, maxLength: 20 })}
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                views={["minutes", "seconds"]}
                format="mm:ss"
                onChange={(value) => setTimeValue(value)}
                timeSteps={{ minutes: 1, seconds: 1 }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ActivityForm;
