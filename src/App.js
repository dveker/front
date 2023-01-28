import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import ReactDOM from 'react-dom/client';
import './App.css';
import Cart from './components/CarList';

const App = () => {
    const [myProducts, setmyProducts] = useState([])
    const SERVER ='http://127.0.0.1:8000/myProducts'
    const [refreshFlaga, setrefreshFlaga] = useState(false)
    const [name, setname] = useState("")
    const [modelcar, setmodel] = useState(2)
    const [year, setyear] = useState(18)
    const [phonenumber, setphone] = useState("#")
    const [price, setprice] = useState(2)
    const [image, setimage] = useState("p.jpg")
    const [id, setid] = useState([]);
    

    const loadData=async ()=>{
      let temp= await axios.get(SERVER)
      setmyProducts(temp.data)
    }
    useEffect(() => {
        loadData()
    }, [refreshFlaga])
    const addcar=()=>{
        axios.post(SERVER, { name, modelcar, year,phonenumber , price, image})
          setrefreshFlaga(!refreshFlaga)
    }
    const updcar=(id)=>{
        axios.put(SERVER+id, { name, modelcar, year,phonenumber , price, image})
          setrefreshFlaga(!refreshFlaga)
    }
    const delStudent=(id)=>{
        axios.delete(SERVER +id)
        setrefreshFlaga(!refreshFlaga)
    }

      
    function addItemToCart(ids) {
        // make API call to add item to cart
         setid([...id, ids]);
    }
      
    function removeItemFromCart(removeids) {
        // make API call to remove item from cart
        setid(id.filter(ids => ids.id !== removeids));
    }
    

    
    return (
        <div>
            <div id="navbar">
              <a href="#home">Home</a>
              <h1>Cart</h1>
                <ul>
                    {id.map(ids => (
                <li key={ids.id}>
                    {ids.name} 
                <button onClick={() => removeItemFromCart(ids.id)}>Remove</button>
                </li>
                ))}
                </ul>
        </div>
        <div>

            <button><h1>Cart</h1></button>
                <ul>
                    {id.map(ids => (
                <li key={ids.id}>
                    {ids.name} 
                <button onClick={() => removeItemFromCart(ids.id)}>Remove</button>
                </li>
                ))}
                </ul>
        </div>

            <div className="row row-cols-1 row-cols-md-5 g-4">
                {myProducts.map(stu => <div className="col">
                    <div className="card">
                        <img src={`/media/${stu.image}`} className="card-img-top" alt="..." style={{ maxHeight: "150px" }} />
                        <div className="container">
                            <h3 className="card-title">{stu.name}</h3>
                            <h5 className="card-title">{stu.modelcar}, {stu.year}</h5>
                            <p className="card-text">{stu.phonenumber}</p>
                            <p className="card-text">{stu.price}</p>
                            <button className='btn btn-success'>Buy</button>
                            <button>My cart</button>
                        </div>
                    </div>
                </div>)}
            </div> </div>
    )
}
export default App