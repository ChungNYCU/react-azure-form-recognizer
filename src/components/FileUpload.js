import React, { useState } from 'react';
import Path from 'path';

import FormRecongnizerResultDisplay from './FormRecongnizerResultDisplay';
import uploadFileToBlob, { isStorageConfigured } from './azureBlob';

import '../App.css';

const containerName = process.env.REACT_APP_STORAGE_CONTAINER_NAME;
const storageAccountName = process.env.REACT_APP_STORAGE_RESOURCE_NAME; 
const storageConfigured = isStorageConfigured();

const displayWidth = 450;
const displayHeight = 800;

const FileUpload = () => {
  // list of image's file name
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

    // set maximum value to 2 because of Azure subscription is free tier
    if (event.target.files.length > 2) {
      alert('To many files! The max is 2 files.');
    } else {
      setFileSelected(event.target.files);
    }
  };

  const onFileUpload = () => {

    if (fileSelected.length === 0) {
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
      <input type="file" onChange={onFileChange} key={inputKey || ''} multiple id="fileUpload" />
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
        {fileNames.map((item, index) => {
          return (
            <li key={item}>
              <h2 className='h2FileName'>{Path.basename(item)}</h2>
              <div >
                <FormRecongnizerResultDisplay receiptURL={item} receiptIndex={index} width={displayWidth} height={displayHeight} />
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
      {(storageConfigured && blobList.length > 0) && DisplayImagesFromContainer()}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default FileUpload;