import React from 'react';
import {useState} from 'react';

const ItemsList = (props) => {

    const [Description, setDescription] = useState(props.item.Description.valueString);
    const [Quantity, setQuantity] = useState(props.item.Quantity.valueNumber);
    const [TotalPrice, setTotalPrice] = useState(props.item.TotalPrice.valueNumber);

    props.item.Description.valueString = Description;
    props.item.Quantity.valueNumber = Quantity;
    props.item.TotalPrice.valueNumber = TotalPrice;

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
