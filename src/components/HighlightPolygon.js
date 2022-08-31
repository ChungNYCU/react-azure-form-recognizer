import React from 'react';

// input: objectKey(string), objectValue(object), xRatio(float), yRatio(float), key(int)
// pass data in HighlightPolygon and get points to generate polygon.
const HighlightPolygon = (props) => {
    const data = props.objectValue;
    const key = props.objectKey;
    const xRatio = props.xRatio;
    const yRatio = props.yRatio;
    const displayWidth = props.width;
    const displayHeight = props.height;

    const getPoint = (pointNo) => {
        const point = data.boundingRegions[0].polygon[pointNo].x * xRatio.toString() + ',' + data.boundingRegions[0].polygon[pointNo].y * yRatio.toString();
        return point;
    }

    const getPoints = (pt1, pt2, pt3, pt4) => {
        return pt1 + ' ' + pt2 + ' ' + pt3 + ' ' + pt4;
    }

    // if key equal to Items then call HighlightPolygon component again for each item to process data, 
    // otherwise generate polygon on image.
    if (key === 'Items') {
        return (
            (data.values.map((items, index) => (
                <HighlightPolygon
                    objectKey={"Item" + index.toString()} objectValue={items}
                    xRatio={xRatio} yRatio={yRatio}
                    width={displayWidth} height={displayHeight}
                    key={index}
                />
            )))
        )
    } else {
        const points = getPoints(getPoint(0), getPoint(1), getPoint(2), getPoint(3));
        return (
            <div className="ImageDisplay-overlapInfo" key={key}>
                <svg width={displayWidth} height={displayHeight}>
                    <polygon points={points} />
                </svg>
            </div>
        )
    }
}


export default HighlightPolygon;
