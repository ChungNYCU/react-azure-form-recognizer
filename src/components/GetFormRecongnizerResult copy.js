import React from 'react';

const GetFormRecongnizerResult = () => {
  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
  //test
  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  const key = "65ade927ebb8467fbf0b42a634b79cd9";
  const endpoint = "https://mfr.cognitiveservices.azure.com/";
  const formUrl = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"

  //const [results, setResults] = React.useState([]);
  
  const fetchData = async() => {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
    const poller = await client.beginAnalyzeDocument("prebuilt-document", formUrl);

    //const result = await poller.pollUntilDone().getResult();
          
    //whatever you receive convert to the JSON format ('axios' does this by default)
    // const data = await poller.pollUntilDone();
    // console.log('data: ', data);
    const {
        keyValuePairs,
        entities
    } = await poller.pollUntilDone();

    if (keyValuePairs.length <= 0) {
        //console.log("No key-value pairs were extracted from the document.");
    } else {
        //console.log("Key-Value Pairs:");
        for (const {
                key,
                value,
                confidence
            } of keyValuePairs) {
            
            console.log("- Key  :", `"${key.content}"`);
            console.log("  Value:", `"${(value && value.content) || "<undefined>"}" (${confidence})`);
        }
    }
    //return result;
  }

  fetchData(); 

  

  return (
    <div>
      {/* {results.map(
          result => (
            <React.Fragment>
              <p>{result.key.content}</p>
              <p>{result.value}</p>
            </React.Fragment>
          )
        )
      } */}
    </div>
  )
}

export default GetFormRecongnizerResult;