import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {
    const itemProperties = props.data;
    const itemKey = props.itemIndex;

    return (
        <div key = {itemKey}>
            {Object.keys(itemProperties).map((propertie, propertiesIndex) => (
                <ResultInputFieldGenerator objectKey={propertie} objectValue={itemProperties[propertie]} key={propertiesIndex} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListGenerator;
