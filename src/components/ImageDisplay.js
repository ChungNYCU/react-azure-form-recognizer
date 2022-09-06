import React from 'react';
import HighlightPolygon from './HighlightPolygon';

// input: receiptURL(string), data(object)
// pass Form Recognizer result into ImageDisplay
// then show origin receipt image and overlap information on it.
const ImageDisplay = (props) => {
    const receiptURL = props.receiptURL;
    const data = props.data;
    const displayWidth = props.width;
    const displayHeight = props.height;
    const receiptIndex = props.receiptIndex;

    // calculate ratio between origin receipt image and compression image
    const img = new Image();
    img.src = receiptURL;
    const xRatio = displayWidth / img.width;
    const yRatio = displayHeight / img.height;

    return (
        <div className="ImageDisplay-container">
            <div className="ImageDisplay-img">
                <img src={receiptURL} alt={receiptURL} width={displayWidth} height={displayHeight} />
            </div>
            <div className="ImageDisplay-overlapInfo">
                <svg width={displayWidth} height={displayHeight}>
                    {Object.keys(data).map((key, index) => (
                        <HighlightPolygon
                            objectKey={key} objectValue={data[key]}
                            xRatio={xRatio} yRatio={yRatio}
                            width={displayWidth} height={displayHeight}
                            receiptIndex={receiptIndex} key={index}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}


export default ImageDisplay;
