import React from 'react';
import HighlightPolygon from './HighlightPolygon';

// input: receiptURL(string), data(object)
// pass Form Recognizer result into ImageDisplay
// then show origin receipt image and overlap information on it.
const ImageDisplay = (props) => {
    const receiptURL = props.receiptURL;
    const data = props.data;

    // calculate ratio between origin receipt image and compression image
    const img = new Image();
    img.src = receiptURL;
    const xRatio = 450 / img.width;
    const yRatio = 800 / img.height;

    return (
        <div className="ImageDisplay-container">
            <div className="ImageDisplay-img">
                <img src={receiptURL} alt={receiptURL} width="450" height="800" />
            </div>
            {Object.keys(data).map((key, index) => (
                <HighlightPolygon objectKey={key} objectValue={data[key]} xRatio={xRatio} yRatio={yRatio} key={index} />
            ))}
        </div>
    )
}


export default ImageDisplay;
