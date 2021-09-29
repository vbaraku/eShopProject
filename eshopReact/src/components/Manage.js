import HeaderManage from './HeaderManage';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useEffect, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import NewItemPopup from './NewItemPopup';
import EditItemPopup from './EditItemPopup';
import Cookies from 'js-cookie';  
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    table: {
        marginTop: '20px',
      minWidth: 650,
    },
    label: {
        textTransform: 'capitalize',
      },
  });

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'image', label: 'Image', },
    { id: 'deletebutton', label: 'deletebutton', },
  ];
  
  function createData(id,name,price, image, deletebutton) {
    return {id, name, price, image, deletebutton};
  }

  
  
const Manage = () => {

    const divStyle = {
        marginTop: '15px',
        
      };
    
    const [rows, setRows] = useState([]);


    const classes = useStyles();

    useEffect(() => {
        axios.get('http://localhost:8082').then(response => {
          console.log(response);
          console.log(Cookies.get('token'))
           
          setRows(response.data, <DeleteIcon />)
        //   setRows([createData(response.data[0].id, response.data[0].name, response.data[0].price, response.data[0].img)]);
          
        
        });
      }, []);

  return (
    <>
    <div style={divStyle} className='header'> 
    <HeaderManage  />
    </div>
    <br />
    <div style={{}}>
    <NewItemPopup />
    </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead classes={{ label: 'my-class-name' }}>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">($)Price</TableCell>
            <TableCell align="center">Image URL</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.img}</TableCell>
              <TableCell align="center" style={{display: 'flex'}}><IconButton aria-label="delete" color="primary" onClick={() => {
                  axios.delete('http://localhost:8082/manage/' + row.id, {headers: {"authorization" : Cookies.get('token')}}).then(
                    setRows((currentArray)=>{
                        let newArray = [...currentArray];  
                        newArray.splice(index, 1);
                        return newArray;
                      }),
                      alert("Deleted Successfully")
                  )
               }}>
                    <DeleteIcon />
                </IconButton>
                <EditItemPopup id ={row.id} />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button color="secondary" onClick={() => {Cookies.set('token',null);window.location.href='/login'}}>Logout</Button>
    </>
  );

    
      

    // addNewItem(){
    //     fetch('http://localhost:8082')

    // }        
}

export default Manage