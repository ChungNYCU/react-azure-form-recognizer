import React from 'react';
import { useState, useEffect } from 'react';
import FormRecognizerReceiptInput from './FormRecognizerReceiptInput';

const GetFormRecongnizerResult = (props) => {

  const [data, setData] = useState([]);

  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  //test
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  const key = "74fd2f36e33e415d8484bb143df36bfc";
  //65ade927ebb8467fbf0b42a634b79cd9
  //74fd2f36e33e415d8484bb143df36bfc
  const endpoint = "https://mfr.cognitiveservices.azure.com/";
  // const receiptURL = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"
  //const receiptURL = "https://thumbs.dreamstime.com/b/vector-paper-check-sell-receipt-bill-template-vector-paper-cash-sell-receipt-139437685.jpg"
  const receiptURL = props.receiptURL;
  console.log(props.receiptURL);

  //const [results, setResults] = React.useState([]);
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
        // debugger;
        console.log(result.fields);
        setData(result.fields);
      }catch(err){
        console.log(err);
      }
    };
  
    // call your async function
    fetchData();
  }, []);
  
  return (
    <div key="Fields">
      {Object.keys(data).map((key, index) => (
        <FormRecognizerReceiptInput objectKey={key} objectValue={data[key]} key={index} />
      ))}
    <button onClick={showTotalValue}>Check total value</button>
    </div>
  )
}

export default GetFormRecongnizerResult;
