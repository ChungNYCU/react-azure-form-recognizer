import React from 'react';
import { useState, useEffect } from 'react';

const GetFormRecongnizerResult = () => {

  const [showPosts, setshowPosts] = useState();
  const key = "74fd2f36e33e415d8484bb143df36bfc";
  const endpoint = "https://mfr.cognitiveservices.azure.com/";
  const receiptURL = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"
  const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");


  useEffect(() =>{
    fetchAsync()
    // .then(result => console.log(result))
    // .catch(reason => console.log(reason.message));
  }, [])


  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  
  //const [results, setResults] = React.useState([]);

  let displayData;
  async function fetchAsync () {

    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
    const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

    try {
      const {
        documents: [result],
      } = await poller.pollUntilDone();
      const responseData = result;
      // displayData = responseData.map(function(elem){
      //   return(
      //     <p key={elem.key}>{elem.values}</p>
      //   )
      // })
      console.log(responseData);
      setshowPosts(displayData);
      // debugger;
      
    } catch (err) {
         console.log(err)
    }
  }
  
  // const fetchData = async() => {

  //   const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  //   const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

  //   const {
  //       documents: [result],
  //   } = await poller.pollUntilDone();

  //   if (result) {
  //       const { MerchantName, Items, Total } = result.fields;

  //       console.log("=== Receipt Information ===");
  //       console.log("Type:", result.docType);
  //       console.log("Merchant:", MerchantName && MerchantName.content);

  //       console.log("Items:");
  //       for (const item of (Items && Items.values) || []) {
  //           const { Description, TotalPrice } = item.properties;

  //           console.log("- Description:", Description && Description.content);
  //           console.log("  Total Price:", TotalPrice && TotalPrice.content);
  //       }

  //       console.log("Total:", Total && Total.content);
  //   } else {
  //       throw new Error("Expected at least one receipt in the result.");
  //   }
  //   return result;
  // }


  return (
    <div> 
      {showPosts}
    </div>
  )
}

export default GetFormRecongnizerResult;