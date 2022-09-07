import React, { useState, useEffect } from 'react';
import ImageDisplay from './ImageDisplay';
import ResultInputFieldGenerator from './ResultInputFieldGenerator';

// input: receiptURL(string)
// pass receipt image url into FormRecongnizerResultDisplay
// then display all keyValue information as input fields
const FormRecongnizerResultDisplay = (props) => {
  const displayWidth = props.width;
  const displayHeight = props.height;
  const receiptIndex = props.receiptIndex;
  const state = { loading: -1, fail: 0, success: 1 }
  const [data, setData] = useState([]);
  const [fetchState, setFetchState] = useState(state.loading);

  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  const key = process.env.REACT_APP_API_KEY1;
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const receiptURL = props.receiptURL;

  // check props is updated or not
  const showTotalValue = () => {
    alert(data.Total.value);
  }


  useEffect(() => {
    const fetchData = async () => {
      const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
      const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

      try {
        const {
          documents: [result],
        } = await poller.pollUntilDone();
        console.log(result.fields);

        const data = { 'Total': { 'value': null }, 'TransactionDate': { 'value': null } };

        Object.keys(result.fields).map((key) => (
          data[key] = result.fields[key]
        ));

        setData(data);

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
        {fetchState === state.loading && <h3>Loading...</h3>}
        {fetchState === state.fail && <h3>Something went wrong, check console log</h3>}
        {fetchState === state.success && Object.keys(data).map((key, index) => (
          <ResultInputFieldGenerator
            objectKey={key} objectValue={data[key]}
            receiptIndex={receiptIndex} key={index}
          />
        ))}
        <button onClick={showTotalValue}>Check total value</button>
      </div>
    </div>

  )
}

export default FormRecongnizerResultDisplay;
