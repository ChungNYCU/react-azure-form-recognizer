import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {

    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const receiptIndex = props.receiptIndex;

    const handleMouseOver = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon').style.fill = "rgba(255, 0, 0, 1)";
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Input').style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        } catch (error) {
            console.error(error);
        }
    }

    const handleMouseOut = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon').style.fill = "rgba(0, 0, 0, 1)";
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Input').style.backgroundColor = "transparent";
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div key={itemKey} id={'Receipt' + receiptIndex + itemKey + 'Input'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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
