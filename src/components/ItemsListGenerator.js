import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {

    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const receiptIndex = props.receiptIndex;
    const polygonExist = document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon');

    const inputMouseOverColor = "rgb(0, 0, 255, .5)";
    const inputMouseOutColor = "transparent";

    const polygonMouseOverColor = "rgb(0, 0, 255, 1)";
    const polygonMouseOutColor = "rgba(0, 0, 0, 1)";

    const handleMouseOver = (e) => {
        if (polygonExist) {
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon').style.fill = polygonMouseOverColor;
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Input').style.backgroundColor = inputMouseOverColor;
        }
    }

    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Polygon').style.fill = polygonMouseOutColor;
            document.getElementById('Receipt' + receiptIndex + itemKey + 'Input').style.backgroundColor = inputMouseOutColor;
        }
    }

    return (
        <div key={itemKey} id={'Receipt' + receiptIndex + itemKey + 'Input'}>
            <span onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><b>{itemKey}</b></span>
            {Object.keys(itemProperties).map((propertie, propertiesIndex) => (
                <ResultInputFieldGenerator
                    passModifiedData={props.passModifiedData}
                    objectKey={itemKey + '_' + propertie} objectValue={itemProperties[propertie]}
                    receiptIndex={receiptIndex} key={propertiesIndex} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListGenerator;
