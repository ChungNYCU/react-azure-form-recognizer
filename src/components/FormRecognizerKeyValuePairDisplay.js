import React from 'react';
import { useState } from 'react';
import ItemsListDisplay from './ItemsListDisplay';

// input: objectValue(object), objectKey(string)
// pass keyValue in and display input fields 
const FormRecognizerKeyValuePairDisplay = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;

    // if key equal to Items then call ItemsListDisplay component to process data, 
    // otherwise generate input feild by key and value.
    if (key === 'Items') {
        return (
            <div key={key}>
                <h3>Item list</h3>
                {data.values.map((items, index) => (
                    <ItemsListDisplay item={items.properties} key={index} />
                ))}
                <h3>Transaction information</h3>
            </div>
        )
    } else {
        // update user input field
        const [userInput, setUserInput] = useState(data.value);
        data.value = userInput;
        return (
            <div key={key}>
                <span>{key}:
                    <input
                        key={key + 'Input'}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                </span>
            </div>
        )
    }

}

export default FormRecognizerKeyValuePairDisplay;
