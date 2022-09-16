import React from 'react';
import HighlightPolygon from './HighlightPolygon';

// input: fileURL(string), data(object)
// pass Form Recognizer result into ImageDisplay
// then show origin file and overlap information on it.
const ImageDisplay = (props) => {
    
    const fileURL = props.fileURL;
    const data = props.data;
    const displayWidth = props.width;
    const displayHeight = props.height;
    const fileIndex = props.fileIndex;

    // calculate ratio between origin file and compression image
    const img = new Image();
    img.src = fileURL;
    const xRatio = displayWidth / img.width;
    const yRatio = displayHeight / img.height;

    return (
        <div className="ImageDisplay-container">
            <div className="ImageDisplay-img">
                <img src={fileURL} alt={fileURL} width={displayWidth} height={displayHeight} />
            </div>
            <div className="ImageDisplay-overlapInfo">
                <svg width={displayWidth} height={displayHeight}>
                    {Object.keys(data).map((key, index) => (
                        <HighlightPolygon
                            objectKey={key} objectValue={data[key]}
                            xRatio={xRatio} yRatio={yRatio}
                            width={displayWidth} height={displayHeight}
                            fileIndex={fileIndex} key={index}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}


export default ImageDisplay;
