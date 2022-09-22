import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: item(object)
// pass items list in ItemsListDisplay 
// then call FormRecognizerKeyValuePairDisplay to process keyValue pairs.
const ItemsListGenerator = (props) => {

    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const fileIndex = props.fileIndex;
    const polygonExist = document.getElementById(`Receipt-${fileIndex}-Field-${itemKey}-Polygon`);

    const handleMouseOver = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${fileIndex}-Field-${itemKey}-Polygon`).setAttribute('class', 'polygonMouseOverColor');
            document.getElementById(`Receipt-${fileIndex}-Field-${itemKey}-Input`).setAttribute('class', 'row inputMouseOverColor');
        }
    }
    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${fileIndex}-Field-${itemKey}-Polygon`).setAttribute('class', 'Polygon');
            document.getElementById(`Receipt-${fileIndex}-Field-${itemKey}-Input`).setAttribute('class', 'row itemMouseOutColor');
        }
    }


    return (
        <div className='row' key={itemKey} id={`Receipt-${fileIndex}-Field-${itemKey}-Input`}>
            <span onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><b>{itemKey}</b></span>
            {Object.keys(itemProperties).map((propertie, propertiesIndex) => (
                <ResultInputFieldGenerator
                    passModifiedData={props.passModifiedData}
                    objectKey={`${itemKey}_${propertie}`} objectValue={itemProperties[propertie]}
                    fileIndex={fileIndex} key={propertiesIndex} />
            ))}
            <br />
        </div>
    )
}


export default ItemsListGenerator;
