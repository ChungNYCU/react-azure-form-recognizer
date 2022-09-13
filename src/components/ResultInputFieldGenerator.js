import React, { useState } from 'react';
import ItemsListGenerator from './ItemsListGenerator';

// input: objectValue(object), objectKey(string)
// pass keyValue in and display input fields 
const ResultInputFieldGenerator = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;
    const receiptIndex = props.receiptIndex;
    const importantInfoKey = ['Total', 'TransactionDate'];
    const labelContent = key.indexOf('_') === -1 ? key : key.slice(key.indexOf('_') + 1); // item detail's label name
    const polygonExist = document.getElementById(`Receipt-${receiptIndex}-${key}-Polygon`);

    // update user input field
    const [userInput, setUserInput] = useState(
        key !== 'TransactionDate' ? data.value :
            new Date(data.value).toLocaleDateString('zh-Hans-CN', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: 'UTC',
            }).replaceAll("/", "-"));
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
            document.getElementById(`Receipt-${receiptIndex}-${key}-Polygon`).setAttribute('class', 'polygonMouseOverColor');
        }
    }

    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${receiptIndex}-${key}-Polygon`).setAttribute('class', 'Polygon');
        }
    }

    const handleHighlightMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById(`Receipt-${receiptIndex}-${key}-Polygon`).setAttribute('class', 'HighlightPolygon');
        }
    }


    // if key equal to Items then call ItemsListDisplay component to process data, 
    // otherwise generate input feild by key and value.
    if (key === 'Items') {
        return (
            <div key={key}>
                <h3>Item list</h3>
                {data.values.map((item, index) => (
                    <ItemsListGenerator
                        passModifiedData={props.passModifiedData}
                        data={item.properties} objectKey={`Item-${index}`}
                        receiptIndex={receiptIndex} key={index}
                    />
                ))}
                <h3>Other information</h3>
            </div>
        )
    } if (importantInfoKey.includes(key)) {
        return (
            <div className='Input' key={key} id={`Receipt-${receiptIndex}-${key}-Input`}
                onMouseOver={handleMouseOver} onMouseOut={handleHighlightMouseOut}>
                <label>{key + ': '}</label>
                <input type={data.kind}
                    key={`${key}-Input`}
                    value={userInput}
                    onChange={(e) => handleValueChange(e)}
                />
            </div>
        )
    } else {
        return (
            <div className='Input' key={key} id={`Receipt-${receiptIndex}-${key}-Input`}
                onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <label>{labelContent + ': '}</label>
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
