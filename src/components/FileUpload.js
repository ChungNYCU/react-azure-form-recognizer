import React, { useState } from 'react';
import Path from 'path';

import FormRecongnizerResultDisplay from './FormRecongnizerResultDisplay';
import uploadFileToBlob, { isStorageConfigured } from './azureBlob';

import '../App.css';

const containerName = 'test';
const storageAccountName = process.env.storageresourcename || "msftfr"; // Fill string with your Storage resource name
const storageConfigured = isStorageConfigured();

const FileUpload = () => {
  //
  const [fileNames, setFileNames] = useState([]);

  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState([]);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event) => {
    // reset file names
    setFileNames([]);

    // capture file into state
    console.log(event.target.files);
    setFileSelected(event.target.files);
  };

  const onFileUpload = () => {

    if(fileSelected.length === 0){
      alert('No file selected');
    }

    // prepare UI
    setUploading(true);

    for (let i = 0; i < fileSelected.length; i++) {
      let file = fileSelected.item(i);
      fileUpload(file);
    }

    // reset state/form
    setFileSelected([]);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  const fileUpload = async (file) => {
    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(file);
    // prepare UI for results
    fileNames.push(`https://${storageAccountName}.blob.core.windows.net/${containerName}/${file.name}`);
    setBlobList(blobsInContainer);
  };

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} multiple/>
      <button type="submit" onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  );

  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h1>Uploaded Receipts</h1>
      <ul>
        {fileNames.map((item) => {
          return (
            <li key={item}>
              <h2>{Path.basename(item)}</h2>
              <div className="FileUpload-container">
                <img className="img" src={item} alt={item} height="800" width="450"/>
                <FormRecongnizerResultDisplay receiptURL = {item}/>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div>
      <h1>Upload receipts to Microsoft Form Recognizer</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default FileUpload;