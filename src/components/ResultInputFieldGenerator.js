import React, { useState } from 'react';
import ItemsListGenerator from './ItemsListGenerator';

// input: objectValue(object), objectKey(string)
// pass keyValue in and display input fields 
const ResultInputFieldGenerator = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;
    const receiptIndex = props.receiptIndex;

    const handleMouseOver = (e) => {
        document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = "rgba(255, 0, 0, 1)";
        document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = "rgba(255, 0, 0, 0.5)";

    }

    const handleMouseOut = (e) => {
        document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = "rgba(0, 0, 0, 1)";
        document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = "transparent";

    }

    const handleHighlightMouseOut = (e) => {
        document.getElementById('Receipt' + receiptIndex + key + 'Polygon').style.fill = "rgba(0, 0, 255, 1)";
        document.getElementById('Receipt' + receiptIndex + key + 'Input').style.backgroundColor = "transparent";

    }

    // if key equal to Items then call ItemsListDisplay component to process data, 
    // otherwise generate input feild by key and value.
    if (key === 'Items') {
        return (
            <div key={key}>
                <h3>Item list</h3>
                {data.values.map((item, index) => (
                    <ItemsListGenerator
                        data={item.properties} objectKey={"Item" + index.toString()}
                        receiptIndex={receiptIndex} key={index}
                    />
                ))}
                <h3>Other information</h3>
            </div>
        )
    } if (key === 'Description' || key === 'Quantity' || key === 'Price' || key === 'TotalPrice') {
        // update user input field
        const [userInput, setUserInput] = useState(data.value);
        data.value = userInput;
        return (
            <div key={key} id={'Receipt' + receiptIndex + key + 'Input'} >
                <label>{key + ': '}</label>
                <input
                    key={key + 'Input'}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
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
        return (
            <div key={key} id={'Receipt' + receiptIndex + key + 'Input'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <label>{key + ': '}</label>
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
