import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListDisplay = (props) => {
    const data = props.item;

    return (
        <div>
            {Object.keys(data).map((key, index) => (
                <ResultInputFieldGenerator objectKey={key} objectValue={data[key]} key={index} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListDisplay;
