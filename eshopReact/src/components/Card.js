import React, { useRef, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import CreditCardIcon from '@material-ui/icons/CreditCard';

export default function Card({price}) {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState(null);

    

  const handleClickOpen = () => {
    axios.get('http://localhost:8082/sessiontoken?amount=' + price).then(function (response) {
        console.log(response.data);
        setToken(response.data);})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const handleSubmit = () => {
   
    
    
  };
  
  const cardName = useRef(null);
  const cardNumber = useRef(null);
  const expiryMonth = useRef(null);
  const expiryYear = useRef(null);
  const cvv = useRef(null);
  return (
    <div>
        <IconButton aria-label="newItem" onClick={handleClickOpen}>
                    <CreditCardIcon color="primary" />
                </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Direct purchase</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the card information.
          </DialogContentText>
          <form action= {"https://test.merchantsafeunipay.com/merchant/post/sale/" + token} method="POST">
          <TextField
            required="true"
            inputRef={cardName}
            autoFocus
            margin="dense"
            name="cardName"
            id="cardName"
            label="Name on the card"
            type="text"
            fullWidth
          />
        
          <TextField
            inputRef={cardNumber}
            required="true"
            name="cardNumber"
            margin="dense"
            id="cardNumber"
            label="Card number"
            type="number"
            fullWidth
          />
          
          <TextField
            inputRef={cvv}
            required="true"
            margin="dense"
            name="cvv"
            id="cvv"
            label="CVV"
            type="number"
            halfWidth
            size="small"
          />

          <TextField
            inputRef={expiryMonth}
            required="true"
            margin="dense"
            name="expiryMonth"
            id="expiryMonth"
            label="Month of expiry"
            type="number"
            halfWidth
            helperText="Month of expiry"
          />

           <TextField
            inputRef={expiryYear}
            required="true"
            margin="dense"
            id="expiryYear"
            name="expiryYear"
            label="Year of expiry "
            type="number"
            halfWidth
            helperText="Year of expiry"
          />

            {/* <TextField
            label="Price"
            defaultValue = {"$" + price}
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            id="Price"
            halfWidth
            
          /> */}
          <input type="submit" value="Submit" />
        </form>
          
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Buy
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
  
}
