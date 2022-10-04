import React from 'react';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: data(object), objectKey(string), fileIndex(number)
// pass items list in ItemsListGenerator 
// then call ResultInputFieldGenerator to process keyValue pairs.
const ItemsListGenerator = (props) => {

    const itemProperties = props.data;
    const itemKey = props.objectKey;
    const fileIndex = props.fileIndex;
    const polygonExist = document.getElementById(`File-${fileIndex}-Field-${itemKey}-Polygon`);

    const handleMouseOver = (e) => {
        if (polygonExist) {
            document.getElementById(`File-${fileIndex}-Field-${itemKey}-Polygon`).setAttribute('class', 'polygonMouseOverColor');
            document.getElementById(`File-${fileIndex}-Field-${itemKey}-Input`).setAttribute('class', 'row inputMouseOverColor');
        }
    }
    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`File-${fileIndex}-Field-${itemKey}-Polygon`).setAttribute('class', 'Polygon');
            document.getElementById(`File-${fileIndex}-Field-${itemKey}-Input`).setAttribute('class', 'row itemMouseOutColor');
        }
    }


    return (
        <div className='row' key={itemKey} id={`File-${fileIndex}-Field-${itemKey}-Input`}>
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
