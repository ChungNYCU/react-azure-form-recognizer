import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {

    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const receiptIndex = props.receiptIndex;

    const inputMouseOverColor = "rgb(0, 0, 255, .5)";
    const inputMouseOutColor = "transparent";

    const polygonMouseOverColor = "rgb(0, 0, 255, 1)";
    const polygonMouseOutColor = "rgba(0, 0, 0, 1)";

    const handleMouseOver = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon').style.fill = polygonMouseOverColor;
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Input').style.backgroundColor = inputMouseOverColor;
        } catch (error) {
            console.error(error);
        }
    }

    const handleMouseOut = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon').style.fill = polygonMouseOutColor;
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Input').style.backgroundColor = inputMouseOutColor;
        } catch (error) {
            console.error(error);
        }
    }
    //onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
    return (
        <div key={itemKey} id={'Receipt' + receiptIndex + itemKey + 'Input'} >
            {Object.keys(itemProperties).map((propertie, propertiesIndex) => (
                <ResultInputFieldGenerator
                    objectKey={itemKey + '_' + propertie} objectValue={itemProperties[propertie]}
                    receiptIndex={receiptIndex} key={propertiesIndex} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListGenerator;
