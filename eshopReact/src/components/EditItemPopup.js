import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import Cookies from 'js-cookie';


export default function EditItemPopup({id}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const handleSubmit = () => {
    console.log(nameInput.current.value)
        axios.put('http://localhost:8082/manage/' + id, {
        name: nameInput.current.value,
        price: priceInput.current.value,
        img: imgInput.current.value
      }, {headers : {"authorization" : Cookies.get('token')} })
      
    setOpen(false);
    window.location.href='/manage';

    
  };
  
  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const imgInput = useRef(null);
  return (
    <div>
        <IconButton aria-label="newItem" onClick={handleClickOpen}>
                    <EditIcon color="primary" />
                </IconButton>
        
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update existing item id = '{id}'</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the information please fill out the fields with the new info:
          </DialogContentText>
          <TextField
            inputRef={nameInput}
            required
            autoFocus
            margin="dense"
            id="newItemName"
            label="Name"
            type="text"
            halfWidth
          />
        
          <TextField
            inputRef={priceInput}
            required
            margin="dense"
            id="newItemPrice"
            label="Price($)"
            type="number"
            halfWidth
          />
          <TextField
            inputRef={imgInput}
            required
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
            Complete editing
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}
