import React, { useState } from 'react';
import ItemsListGenerator from './ItemsListGenerator';

// input: objectValue(object), objectKey(string)
// pass keyValue in and display input fields 
const ResultInputFieldGenerator = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;
    const receiptIndex = props.receiptIndex;

    const inputMouseOverColor = "rgb(0, 0, 255, .5)";
    const inputMouseOutColor = "transparent";

    const polygonMouseOverColor = "rgb(0, 0, 255, 1)";
    const polygonMouseOutColor = "rgba(0, 0, 0, 1)";
    const highlightPolygonMouseOutColor = "rgba(255, 255, 0, 1)";

    const handleMouseOver = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = polygonMouseOverColor;
            document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = inputMouseOverColor;
        } catch (error) {
            console.error(error);
        }
    }

    const handleMouseOut = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = polygonMouseOutColor;
            document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = inputMouseOutColor;
        } catch (error) {
            console.error(error);
        }
    }

    const handleHighlightMouseOut = (e) => {
        try {
            document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = highlightPolygonMouseOutColor;
            document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = inputMouseOutColor;
        } catch (error) {
            console.error(error);
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
                        data={item.properties} objectKey={'Item' + index.toString()}
                        receiptIndex={receiptIndex} key={index}
                    />
                ))}
                <h3>Other information</h3>
            </div>
        )
    } if (key === 'Total' || key === 'TransactionDate') {
        // update user input field
        const [userInput, setUserInput] = useState(data.value);
        data.value = userInput;
        return (
            <div key={key} id={'Receipt' + receiptIndex + key + 'Input'} onMouseOver={handleMouseOver} onMouseOut={handleHighlightMouseOut}>
                <label>{key + ': '}</label>
                <input
                    key={key + 'Input'}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </div>
        )
    } else {
        // update user input field
        const [userInput, setUserInput] = useState(data.value);
        data.value = userInput;
        const labelContent = key.indexOf('_') === -1 ? key : key.slice(key.indexOf('_') + 1);
        return (
            <div key={key} id={'Receipt' + receiptIndex + key + 'Input'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <label>{labelContent + ': '}</label>
                <input
                    key={key + 'Input'}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
            </div>
        )
    }

}

export default ResultInputFieldGenerator;
