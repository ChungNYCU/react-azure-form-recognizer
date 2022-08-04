import React from 'react';
import {useState} from 'react';

const ItemsList = (props) => {

    const [description, setDescription] = useState(props.item.Description.valueString);
    const [quantity, setQuantity] = useState(props.item.Quantity.valueNumber);
    const [totalPrice, setTotalPrice] = useState(props.item.TotalPrice.valueNumber);

    props.item.Description.valueString = description;
    props.item.Quantity.valueNumber = quantity;
    props.item.TotalPrice.valueNumber = totalPrice;

    return (
        <div key="item">
            <span>Description: 
                <input 
                key="Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </span><br/>
            <span>Quantity: 
                <input
                key="Quantity"
                value={quantity} 
                onChange={(e)=>setQuantity(e.target.value)}
                />
            </span><br/>
            <span>TotalPrice: 
                <input 
                key="TotalPrice"
                value={totalPrice} 
                onChange={(e)=>setTotalPrice(e.target.value)}
                />
            </span><br/>
        </div>
    )
}


export default ItemsList;
