import axios from 'axios';
import HeaderHome from './HeaderHome';
import Chair from './Chair';
import React, { useEffect, useState } from "react";


const Home = () => {

const [chairs, setChairs] = useState();

  useEffect(() => {
    axios.get('http://localhost:8082').then(response => {
      console.log(response);
      setChairs(response.data.map((chair, i) => {
        return (
          <Chair key={'chair-' + i} name={chair.name} price={chair.price} imgUrl={chair.img} />
        );
      }));
    });
  }, []);

  console.log()

    return (
        <div className='allinfo'> 
            <HeaderHome />
            {chairs}
        </div>
    )
}

export default Home