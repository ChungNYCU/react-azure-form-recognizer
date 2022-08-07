import React from 'react';
//import { useState, useEffect } from 'react';
import FormRecognizerReceiptInput from './FormRecognizerReceiptInput';

const GetFormRecongnizerResult = () => {

  //const [showPosts, setshowPosts] = useState();

  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  //test
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  const key = "74fd2f36e33e415d8484bb143df36bfc";
  //65ade927ebb8467fbf0b42a634b79cd9
  //74fd2f36e33e415d8484bb143df36bfc
  const endpoint = "https://mfr.cognitiveservices.azure.com/";
  const receiptURL = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"

  //const [results, setResults] = React.useState([]);
  
  const fetchData = async() => {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
    const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

    //const result = await poller.pollUntilDone().getResult();
          
    //whatever you receive convert to the JSON format ('axios' does this by default)
    // const data = await poller.pollUntilDone();
    // console.log('data: ', data);

    try{
      const {
        documents: [result],
      } = await poller.pollUntilDone();

      console.log(result.fields);
      //setshowPosts(result);
      // debugger;
      return result.fields;
      
    }catch(err){
      console.log(err);
    }
    
  }

  const data = fetchData(); 

  // return (
  //   <FormRecognizerReceiptInput propsData = {data}/>
  // )
}

export default GetFormRecongnizerResult;
