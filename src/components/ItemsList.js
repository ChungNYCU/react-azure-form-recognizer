import React from 'react';
import FormRecognizerReceiptInput from './FormRecognizerReceiptInput';

const ItemsList = (props) => {
    const data = props.item;

    return (
        <div>
            {Object.keys(data).map((key, index) => (
                <FormRecognizerReceiptInput objectKey={key} objectValue={data[key]} key={index} />
            ))}
            <br/>
        </div>
    )
}


export default ItemsList;
