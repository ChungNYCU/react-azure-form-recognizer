import React, { useState, useEffect } from 'react';
import ImageDisplay from './ImageDisplay';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

import 'bootstrap/dist/css/bootstrap.min.css';
import { resultParser } from './Parser';

// input: fileURL(string), model(string), width(number), height(number), fileIndex(number)
// pass file url into FormRecongnizerResultDisplay
// then display all keyValue information as input fields
const FormRecongnizerResultDisplay = (props) => {

  const key = process.env.REACT_APP_API_KEY1;
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const fileURL = props.fileURL;

  const model = props.model;
  const displayWidth = props.width;
  const displayHeight = props.height;
  const fileIndex = props.fileIndex;
  const state = { loading: -1, fail: 0, success: 1 }
  const [data, setData] = useState([]);
  const [fetchState, setFetchState] = useState(state.loading);
  const [accuracy, setAccuracy] = useState(100);
  const [errorCount, setErrorCount] = useState(0);
  const [totalCount, setTotalCount] = useState('NaN');
  const [modifiedInput, setModifiedInput] = useState(null);
  const [modifyCounter, setModifyCounter] = useState(0);

  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.

  useEffect(() => {
    setModifyCounter(modifyCounter + 1);
  }, [modifiedInput]);

  useEffect(() => {
    const checkAccuracy = () => {
      let totalCount = 0;
      let errorCount = 0;

      // property 'origin' is the origin value from Form Recognizer, which means user correct the value.
      for (const [key, value] of Object.entries(data)) {
        if (key === 'Items') {
          for (const [, itemValue] of Object.entries(value.values)) {
            for (const [, propertieValue] of Object.entries(itemValue.properties)) {
              if ('origin' in propertieValue && propertieValue['origin'] !== propertieValue['value']) {
                errorCount++;
              }
              totalCount++;
            }
          }
        } else {
          if ('origin' in value && value['origin'] !== value['value']) {
            errorCount++;
          }
          totalCount++;
        }
      }
      setAccuracy(totalCount === 0 ? 100 + '%' : (100 * (1 - errorCount / totalCount)).toFixed(2) + '%');
      setErrorCount(errorCount);
      setTotalCount(totalCount);
    }
    checkAccuracy();

  }, [modifyCounter]);

  useEffect(() => {
    const fetchData = async () => {

      const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
      const poller = await client.beginAnalyzeDocument(model, fileURL);

      let totalCount = 0;

      try {
        const {
          documents: [result],
        } = await poller.pollUntilDone();
        console.log(result.fields);

        const data = new resultParser(model, result.fields).parseResult();

        setData(data);

        for (const [key, value] of Object.entries(data)) {
          if (key === 'Items') {
            for (const [, itemValue] of Object.entries(value.values)) {
              for (const [,] of Object.entries(itemValue.properties)) {
                totalCount++;
              }
            }
          } else {
            totalCount++;
          }
        }

        setTotalCount(totalCount);

        // set state to success
        setFetchState(state.success);
      } catch (err) {
        console.log(err);
        // set state to fail
        setFetchState(state.fail);
      }
    };
    fetchData();

  }, []);


  return (
    <div className="FormRecongnizerResultDisplay-container">
      <ImageDisplay
        fileURL={fileURL} data={data}
        width={displayWidth} height={displayHeight}
        fileIndex={fileIndex}
      />
      <div key="Fields">
        <h3>Transaction information</h3>
        {fetchState === state.loading &&
          <div>
            <div className="spinner-border" role="status" /><br />
            <span className="sr-only">Loading...</span>
          </div>
        }
        {fetchState === state.fail && <h3>Something went wrong, check console log</h3>}
        {fetchState === state.success &&
          <div className='container'>
            <div className='row'>
              {Object.keys(data).map((key, index) => (
                <ResultInputFieldGenerator
                  passModifiedData={setModifiedInput}
                  objectKey={key} objectValue={data[key]}
                  fileIndex={fileIndex} key={index} />
              ))}
            </div>
          </div>
        }
        <br />
        <span>Accuracy:</span>
        <span>{accuracy}, {totalCount - errorCount}/{totalCount}</span>
      </div>
    </div >

  )
}

export default FormRecongnizerResultDisplay;
