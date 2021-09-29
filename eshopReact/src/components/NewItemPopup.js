import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function NewItemPopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const handleSubmit = () => {
    console.log(nameInput.current.value)
        axios.post('http://localhost:8082/manage', {
        name: nameInput.current.value,
        price: priceInput.current.value,
        img: imgInput.current.value
      }, {headers : {"authorization" : Cookies.get('token')}})
      .then(function (response) {
        window.location.reload();
      })
    setOpen(false);
    
  };
  
  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const imgInput = useRef(null);
  return (
    <div>
        <IconButton aria-label="newItem" onClick={handleClickOpen}>
                    <AddBoxIcon color="primary" />Add new item
                </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new item please fill out the information.
          </DialogContentText>
          <TextField
            required="true"
            inputRef={nameInput}
            autoFocus
            margin="dense"
            id="newItemName"
            label="Name"
            type="text"
            halfWidth
          />
        
          <TextField
            inputRef={priceInput}
            required="true"
            margin="dense"
            id="newItemPrice"
            label="Price($)"
            type="number"
            halfWidth
          />
          <TextField
            inputRef={imgInput}
            required="true"
            margin="dense"
            id="newItemImg"
            label="Image URL"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}
