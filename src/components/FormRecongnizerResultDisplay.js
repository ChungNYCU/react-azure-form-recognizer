import React from 'react';
import { useState, useEffect } from 'react';
import FormRecognizerKeyValuePairDisplay from './FormRecognizerKeyValuePairDisplay';

// input: receiptURL(string)
// pass receipt image url into FormRecongnizerResultDisplay
// then display all keyValue information as input fields
const FormRecongnizerResultDisplay = (props) => {
  const state = {loading: -1, fail: 0, success: 1}
  const [data, setData] = useState([]);
  const [fetchState, setFetchState] = useState(state.loading);

  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  const key = "74fd2f36e33e415d8484bb143df36bfc";
  // 65ade927ebb8467fbf0b42a634b79cd9
  // 74fd2f36e33e415d8484bb143df36bfc
  const endpoint = "https://mfr.cognitiveservices.azure.com/";
  const receiptURL = props.receiptURL;

  // check props is updated or not
  function showTotalValue() {
    alert(data.Total.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
      const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

      try{
        const {
          documents: [result],
        } = await poller.pollUntilDone();
        console.log(result.fields);
        setData(result.fields);
        // set state to success
        setFetchState(state.success);
      }catch(err){
        console.log(err);
        // set state to fail
        setFetchState(state.fail);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div key="Fields">
      {fetchState=== state.loading && <h3>Loading...</h3>}
      {fetchState=== state.fail && <h3>Something went wrong, check console log</h3>}
      {fetchState=== state.success && Object.keys(data).map((key, index) => (
        <FormRecognizerKeyValuePairDisplay objectKey={key} objectValue={data[key]} key={index} />
      ))}
    <button onClick={showTotalValue}>Check total value</button>
    </div>
  )
}

export default FormRecongnizerResultDisplay;
