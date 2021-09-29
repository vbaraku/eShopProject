import './Chair.scss';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import axios from 'axios';
import Card from './Card';

function clicked(price){
    
    axios.get('http://localhost:8082/sessiontoken?amount=' + price).then(function (response) {
        console.log(response);
        window.location.href = "https://test.merchantsafeunipay.com/merchant/payment/testmerchant/" + response.data;
      })
}

const Chair = ({name, price, imgUrl}) => {
    return (
        <div className='chair'> 
            <p id='name'>{name}</p>
            <img id='img' src={imgUrl} width='420px'></img>
            <p id='price'>${price}</p>
            <IconButton aria-label="add to shopping cart" color="primary" onClick={()=>{clicked(price)}}>
                <AddShoppingCartIcon />
            </IconButton>
            <Card price ={price}/>
        </div>
    )
}

export default Chair
