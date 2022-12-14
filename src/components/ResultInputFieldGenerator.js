import React, { useState } from 'react';
import ItemsListGenerator from './ItemsListGenerator';
import { dataValueFormatParser } from './Parser';


// input: objectValue(object), objectKey(string), fileIndex(number)
// pass keyValue in and display input fields 
const ResultInputFieldGenerator = (props) => {

    const valueParser = new dataValueFormatParser(props.objectKey, props.objectValue);
    valueParser.parseValue();
    const key = valueParser.objectKey;
    const data = valueParser.objectValue;
    const fileIndex = props.fileIndex;
    const importantInfoKey = ['Total', 'TransactionDate'];
    const labelContent = key.indexOf('_') === -1 ? key : key.slice(key.indexOf('_') + 1); // item detail's label name
    const polygonExist = document.getElementById(`File-${fileIndex}-${key}-Polygon`);

    // update user input field

    const [userInput, setUserInput] = useState(data.value);
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
            document.getElementById(`File-${fileIndex}-${key}-Polygon`).setAttribute('class', 'polygonMouseOverColor');
        }
    }

    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`File-${fileIndex}-${key}-Polygon`).setAttribute('class', 'Polygon');
        }
    }

    const handleHighlightMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`File-${fileIndex}-${key}-Polygon`).setAttribute('class', 'HighlightPolygon');
        }
    }


    // if key equal to Items then call ItemsListDisplay component to process data, 
    // otherwise generate input feild by key and value.
    if (data.kind === 'array') {
        if (data.values[0] && data.values[0].hasOwnProperty('properties')) {
            if (key === 'Items') {
                return (
                    <div key={key}>
                        <br />
                        <h3>Item list</h3>
                        {data.values.map((item, index) => (
                            <ItemsListGenerator
                                passModifiedData={props.passModifiedData}
                                data={item.properties} objectKey={`${key}-${index}`}
                                fileIndex={fileIndex} key={index}
                            />
                        ))}
                        <br />
                        <h3>Other information</h3>
                    </div>
                )
            }
            else {
                return (
                    <div key={key}>
                        {data.values.map((item, index) => (
                            <ItemsListGenerator
                                passModifiedData={props.passModifiedData}
                                data={item.properties} objectKey={`${key}-${index}`}
                                fileIndex={fileIndex} key={index}
                            />
                        ))}
                    </div>
                )
            }
        } else {
            return (
                <div key={key}>
                    {data.values.map((value, index) => (
                        <ResultInputFieldGenerator
                            passModifiedData={props.passModifiedData}
                            objectKey={`${key}-${index}`} objectValue={value}
                            fileIndex={fileIndex} key={index} />
                    ))}
                </div>
            )
        }

    } if (importantInfoKey.includes(key)) {
        return (
            <div className='col Input' key={key} id={`File-${fileIndex}-${key}-Input`}
                onMouseOver={handleMouseOver} onMouseOut={handleHighlightMouseOut}>
                <label>{key + ': '}</label><br />
                <input type={data.kind}
                    key={`${key}-Input`}
                    value={userInput}
                    onChange={(e) => handleValueChange(e)}
                />
            </div>
        )
    } else {
        return (
            <div className='col Input' key={key} id={`File-${fileIndex}-${key}-Input`}
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

export default ResultInputFieldGenerator;
