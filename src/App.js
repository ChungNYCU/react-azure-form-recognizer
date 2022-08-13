import React from 'react';
import {useState} from 'react';
import ImageUploading from 'react-images-uploading';

import './App.css';
import GetFormRecongnizerResult from './components/GetFormRecongnizerResult';
import FileUpload from './components/FileUpload';
import MockData from './data/receipt_sample_json.json';

function App() {

  const data = MockData.analyzeResult.documents[0].fields;

  const [images, setImages] = useState([]);
  const maxNumber = 20;
  const onChange = (imageList, addUpdateIndex) => {
    //console.log(imageList[0].data_url, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <FileUpload />

      {/* <FormRecognizerReceiptInput propsData = {data}/> */}
      {/* <GetFormRecongnizerResult /> */}
    </div>
  );
}

export default App;
