import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {

    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const receiptIndex = props.receiptIndex;
    const polygonExist = document.getElementById(`Receipt-${receiptIndex}-${itemKey}-Polygon`);

    const handleMouseOver = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${receiptIndex}-${itemKey}-Polygon`).setAttribute('class', 'polygonMouseOverColor');
            document.getElementById(`Receipt-${receiptIndex}-${itemKey}-Input`).setAttribute('class', 'inputMouseOverColor');
        }
    }
    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${receiptIndex}-${itemKey}-Polygon`).setAttribute('class', 'Polygon');
            document.getElementById(`Receipt-${receiptIndex}-${itemKey}-Input`).setAttribute('class', 'inputMouseOutColor');
        }
    }


    return (
        <div key={itemKey} id={`Receipt-${receiptIndex}-${itemKey}-Input`}>
            <span onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ><b>{itemKey}</b></span>
            {Object.keys(itemProperties).map((propertie, propertiesIndex) => (
                <ResultInputFieldGenerator
                    passModifiedData={props.passModifiedData}
                    objectKey={`${itemKey}_${propertie}`} objectValue={itemProperties[propertie]}
                    receiptIndex={receiptIndex} key={propertiesIndex} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListGenerator;
