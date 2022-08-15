import React from 'react';

import './App.css';
import FileUpload from './components/FileUpload';
//import MockData from './data/receipt_sample_json.json';

function App() {

  //const data = MockData.analyzeResult.documents[0].fields;

  return (
    <div className="App">
      <FileUpload />
    </div>
  );
}

export default App;
