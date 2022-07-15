import React from 'react';
import {useState} from 'react';

const ItemsList = (props) => {

    const [Description, setDescription] = useState(props.item.Description.content);
    const [Quantity, setQuantity] = useState(props.item.Quantity.content);
    const [TotalPrice, setTotalPrice] = useState(props.item.TotalPrice.content);

    return (
        <div key="item">
            <span>Description: 
                <input 
                key="Description"
                value={Description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </span><br/>
            <span>Quantity: 
                <input
                key="Quantity"
                value={Quantity} 
                onChange={(e)=>setQuantity(e.target.value)}
                />
            </span><br/>
            <span>TotalPrice: 
                <input 
                key="TotalPrice"
                value={TotalPrice} 
                onChange={(e)=>setTotalPrice(e.target.value)}
                />
            </span><br/>
        </div>
    )
}

export default ItemsList;
