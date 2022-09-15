import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ImageDisplay from './ImageDisplay';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

import 'bootstrap/dist/css/bootstrap.min.css';

// input: receiptURL(string)
// pass receipt image url into FormRecongnizerResultDisplay
// then display all keyValue information as input fields
const FormRecongnizerResultDisplay = (props) => {

  const key = process.env.REACT_APP_API_KEY1;
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const receiptURL = props.receiptURL;

  const displayWidth = props.width;
  const displayHeight = props.height;
  const receiptIndex = props.receiptIndex;
  const state = { loading: -1, fail: 0, success: 1 }
  const [data, setData] = useState([]);
  const [fetchState, setFetchState] = useState(state.loading);
  const [accuracy, setAccuracy] = useState('NaN');
  const [modifiedInput, setModifiedInput] = useState(null);
  const [modifyCounter, setModifyCounter] = useState(0);

  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.


  // check props is updated or not
  const showTotalValue = () => {
    alert(data.TransactionTime.value);
  }

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
      setAccuracy((100 * (1 - errorCount / totalCount)).toFixed(2) + '%');
    }
    checkAccuracy();

  }, [modifyCounter]);

  useEffect(() => {
    const fetchData = async () => {
      const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
      const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

      try {
        const {
          documents: [result],
        } = await poller.pollUntilDone();
        console.log(result.fields);

        const data = {
          'Total': {
            'value': '',
            'kind': 'number'
          },
          'TransactionDate': {
            'value': null,
            'kind': 'date'
          }
        };

        // normalize TransactionTime to fit <input type='time'>
        if (result.fields.hasOwnProperty('TransactionTime')) {
          result.fields.TransactionTime.value = result.fields.TransactionTime.value.slice(0, -3);
        }

        setData(Object.assign(data, result.fields));

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
        receiptURL={receiptURL} data={data}
        width={displayWidth} height={displayHeight}
        receiptIndex={receiptIndex}
      />
      <div key="Fields">
        <h3>Transaction information</h3>
        {fetchState === state.loading &&
          <div>
            <div class="spinner-border" role="status" /><br />
            <span class="sr-only">Loading...</span>
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
                  receiptIndex={receiptIndex} key={index} />
              ))}
            </div>
          </div>
        }
        <br />
        <Button onClick={showTotalValue}>Check TransactionTime</Button><br />
        <span>Accuracy:</span>
        <span>{accuracy}</span>
      </div>
    </div >

  )
}

export default FormRecongnizerResultDisplay;
