import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {
    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const receiptIndex = props.receiptIndex;

    return (
        <div key={itemKey} id={'Receipt' + receiptIndex + itemKey + 'Input'}>
            {Object.keys(itemProperties).map((propertie, propertiesIndex) => (
                <ResultInputFieldGenerator
                    objectKey={propertie} objectValue={itemProperties[propertie]}
                    receiptIndex={receiptIndex} key={propertiesIndex} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListGenerator;
