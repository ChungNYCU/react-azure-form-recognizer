import React, { useState } from 'react';
import ItemsListGenerator from './ItemsListGenerator';

// input: objectValue(object), objectKey(string)
// pass keyValue in and display input fields 
const ResultInputFieldGenerator = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;
    const receiptIndex = props.receiptIndex;
    const labelContent = key.indexOf('_') === -1 ? key : key.slice(key.indexOf('_') + 1); // item detail's label name
    const polygonExist = document.getElementById('Receipt' + receiptIndex + key + 'Polygon');

    const inputMouseOverColor = "rgb(0, 0, 255, .5)";
    const inputMouseOutColor = "transparent";

    const polygonMouseOverColor = "rgb(0, 0, 255, 1)";
    const polygonMouseOutColor = "rgba(0, 0, 0, 1)";
    const highlightPolygonMouseOutColor = "rgba(255, 255, 0, 1)";

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
            document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = polygonMouseOverColor;
            document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = inputMouseOverColor;
        }
    }

    const handleMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = polygonMouseOutColor;
            document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = inputMouseOutColor;
        }
    }

    const handleHighlightMouseOut = (e) => {
        if (polygonExist) {
            document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = highlightPolygonMouseOutColor;
            document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = inputMouseOutColor;
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
                        data={item.properties} objectKey={'Item' + index.toString()}
                        receiptIndex={receiptIndex} key={index}
                    />
                ))}
                <h3>Other information</h3>
            </div>
        )
    } if (key === 'Total' || key === 'TransactionDate') {
        return (
            <div key={key} id={'Receipt' + receiptIndex + key + 'Input'} onMouseOver={handleMouseOver} onMouseOut={handleHighlightMouseOut}>
                <label>{key + ': '}</label>
                <input type={data.kind}
                    key={key + 'Input'}
                    value={userInput}
                    onChange={(e) => handleValueChange(e)}
                />
            </div>
        )
    } else {
        return (
            <div key={key} id={'Receipt' + receiptIndex + key + 'Input'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <label>{labelContent + ': '}</label>
                <input type={data.kind}
                    key={key + 'Input'}
                    value={userInput}
                    onChange={(e) => handleValueChange(e)}
                />
            </div>
        )
    }

}

export default ResultInputFieldGenerator;
