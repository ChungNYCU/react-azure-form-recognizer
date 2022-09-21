import React from 'react';

// input: objectKey(string), objectValue(object), xRatio(float), yRatio(float), key(int)
// pass data in HighlightPolygon and get points to generate polygon.
const GerneticHighlightPolygon = (props) => {

    const data = props.objectValue;
    const key = props.objectKey;
    const xRatio = props.xRatio;
    const yRatio = props.yRatio;
    const displayWidth = props.width;
    const displayHeight = props.height;
    const fileIndex = props.fileIndex;
    const inputExist = document.getElementById(`File-${fileIndex}-${key}-Input`);
    const isItemField = key.includes('Item-') && !key.includes('_'); // This constant is used to confirm that the key is the whole or detail of the item

    const getPoint = (pointNo) => {
        if ('boundingRegions' in data) {
            const point = `${data.boundingRegions[0].polygon[pointNo].x * xRatio.toString()},${data.boundingRegions[0].polygon[pointNo].y * yRatio.toString()}`;
            return point;
        } else {
            return '';
        }
    }

    const getBoundingPoints = (pt1, pt2, pt3, pt4) => {
        return pt1 + ' ' + pt2 + ' ' + pt3 + ' ' + pt4;
    }

    const handleMouseOver = (e) => {

        if (inputExist) {
            if (isItemField) {
                document.getElementById(`Receipt-${fileIndex}-${key}-Input`).setAttribute('class', 'row itemMouseOverColor');
            } else {
                document.getElementById(`Receipt-${fileIndex}-${key}-Input`).setAttribute('class', 'col inputMouseOverColor');
            }
        }
    }

    const handleMouseOut = (e) => {
        if (inputExist) {
            if (isItemField) {
                document.getElementById(`Receipt-${fileIndex}-${key}-Input`).setAttribute('class', 'row itemMouseOutColor');
            } else {
                document.getElementById(`Receipt-${fileIndex}-${key}-Input`).setAttribute('class', 'col inputMouseOutColor');
            }
        }
    }

    // if key equal to Items then call HighlightPolygon component again for each item to process data, 
    // otherwise generate polygon on image.
    if (data.kind === 'array' && key === 'Items') {
        return (
            (data.values.map((item, index) => (
                <svg id={item} key={index}>
                    <GerneticHighlightPolygon
                        objectKey={`Item-${index}`} objectValue={item}
                        xRatio={xRatio} yRatio={yRatio}
                        width={displayWidth} height={displayHeight}
                        fileIndex={fileIndex} key={index}
                    />
                    {Object.keys(item.properties).map((propertie, propertiesIndex) => (
                        <GerneticHighlightPolygon
                            objectKey={`Item-${index}_${propertie}`} objectValue={item.properties[propertie]}
                            xRatio={xRatio} yRatio={yRatio}
                            width={displayWidth} height={displayHeight}
                            fileIndex={fileIndex} key={propertiesIndex}
                        />
                    ))}
                </svg>
            )))
        )
    } else if (data.kind === 'array' && key !== 'Items') {
        return (
            (data.values.map((item, index) => (
                <svg id={item} key={index}>
                    <GerneticHighlightPolygon
                        objectKey={`Item-${index}`} objectValue={item}
                        xRatio={xRatio} yRatio={yRatio}
                        width={displayWidth} height={displayHeight}
                        fileIndex={fileIndex} key={index}
                    />
                </svg>
            )))
        )
    }
    else {
        try {
            const points = getBoundingPoints(getPoint(0), getPoint(1), getPoint(2), getPoint(3));
            return (
                <polygon className={"Polygon"} points={points}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    id={`Receipt-${fileIndex}-${key}-Polygon`}
                />
            )
        } catch (error) {
            console.error(error);
        }
    }
}


export default GerneticHighlightPolygon;
