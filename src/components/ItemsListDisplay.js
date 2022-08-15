import React from 'react';
import FormRecognizerKeyValuePairDisplay from './FormRecognizerKeyValuePairDisplay';

const ItemsListDisplay = (props) => {
    const data = props.item;

    return (
        <div>
            {Object.keys(data).map((key, index) => (
                <FormRecognizerKeyValuePairDisplay objectKey={key} objectValue={data[key]} key={index} />
            ))}
            <br/>
        </div>
    )
}


export default ItemsListDisplay;
