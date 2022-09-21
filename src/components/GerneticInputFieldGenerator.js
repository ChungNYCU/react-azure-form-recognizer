import React, { useState } from 'react';
import GerneticItemsListGenerator from './GerneticItemsListGenerator'

// input: objectValue(object), objectKey(string)
// pass keyValue in and display input fields 
const GerneticInputFieldGenerator = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;
    const fileIndex = props.fileIndex;
    const labelContent = key.indexOf('_') === -1 ? key : key.slice(key.indexOf('_') + 1); // item detail's label name
    const polygonExist = document.getElementById(`Receipt-${fileIndex}-${key}-Polygon`);

    // update user input field
    const [userInput, setUserInput] = useState(data.value instanceof Object ? data.value.amount : data.value);
    data.value = userInput;

    const handleValueChange = (e) => {
        // if user modify value will add property 'origin' into object to record origin value
        if (!data.hasOwnProperty('origin')) {
            data['origin'] = data.value;
        }
        if (data.kind === 'number') {
            setUserInput(Number(e.target.value));
        } else {
            setUserInput(e.target.value);
        }
        props.passModifiedData(e.target.value);
    }

    const handleMouseOver = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${fileIndex}-${key}-Polygon`).setAttribute('class', 'polygonMouseOverColor');
        }
    }

    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${fileIndex}-${key}-Polygon`).setAttribute('class', 'Polygon');
        }
    }

    const handleHighlightMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${fileIndex}-${key}-Polygon`).setAttribute('class', 'HighlightPolygon');
        }
    }


    // if key equal to Items then call ItemsListDisplay component to process data, 
    // otherwise generate input feild by key and value.
    if (data.kind === 'array' && key === 'Items') {
        return (
            <div key={key}>
                {data.values.map((item, index) => (
                    <GerneticItemsListGenerator
                        passModifiedData={props.passModifiedData}
                        data={item.properties} objectKey={`Item-${index}`}
                        fileIndex={fileIndex} key={index}
                    />
                ))}
            </div>
        )
    } else if (data.kind === 'array' && key !== 'Items') {
        return (
            (data.values.map((item, index) => (
                <GerneticInputFieldGenerator
                    passModifiedData={props.passModifiedData}
                    objectKey={key} objectValue={item}
                    fileIndex={fileIndex} key={index} />
            )))
        )
    } else {
        return (
            <div className='col Input' key={key} id={`Receipt-${fileIndex}-${key}-Input`}
                onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <label>{labelContent + ': '}</label><br />
                <input type={data.kind}
                    key={`${key}-Input`}
                    value={userInput}
                    onChange={(e) => handleValueChange(e)}
                />
            </div>
        )
    }

}

export default GerneticInputFieldGenerator;
