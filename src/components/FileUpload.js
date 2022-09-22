import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Path from 'path';

import FormRecongnizerResultDisplay from './FormRecongnizerResultDisplay';
import uploadFileToBlob, { isStorageConfigured } from './azureBlob';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const containerName = process.env.REACT_APP_STORAGE_CONTAINER_NAME;
const storageAccountName = process.env.REACT_APP_STORAGE_RESOURCE_NAME;
const storageConfigured = isStorageConfigured();

const FileUpload = () => {
  // list of image's file name
  const [fileNames, setFileNames] = useState([]);

  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState([]);

  // model selected
  const [model, setModel] = useState('prebuilt-receipt');
  const [displayWidth, setDisplayWidth] = useState();
  const [displayHeight, setDisplayHeight] = useState();

  const dropDownModelList = {
    'Receipt': 'prebuilt-receipt',
    'Invoice': 'prebuilt-invoice',
    'Business Card': 'prebuilt-businessCard',
    'Document': 'prebuilt-document',
    'W2 Form': 'prebuilt-tax.us.w2',
    'Read': 'prebuilt-read',
    'Layout': 'prebuilt-layout',
    'Id Document': 'prebuilt-idDocument',
  };

  const modelDisplaySize = {
    'prebuilt-receipt': { 'Width': 450, 'Height': 800 },
    'prebuilt-invoice': { 'Width': 900, 'Height': 1600 },
    'prebuilt-businessCard': { 'Width': 800, 'Height': 450 },
    'prebuilt-document': { 'Width': 450, 'Height': 800 },
    'prebuilt-tax.us.w2': { 'Width': 450, 'Height': 800 },
    'prebuilt-read': { 'Width': 450, 'Height': 800 },
    'prebuilt-layout': { 'Width': 450, 'Height': 800 },
    'prebuilt-idDocument': { 'Width': 450, 'Height': 800 },
  };

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

  const onModelChange = (event) => {
    setModel(event.target.value);
  };

  useEffect(() => {
    setDisplayWidth(modelDisplaySize[model].Width);
    setDisplayHeight(modelDisplaySize[model].Height);
  }, [model]);

  // display form
  const DisplayForm = () => (
    <div className='row'>
      <div className="col-auto">
        <select onChange={onModelChange} className="form-select" aria-label="Default select example">
          <option defaultValue>Select model</option>
          {Object.keys(dropDownModelList).map((key, index) => {
            return (
              <option value={dropDownModelList[key]} key={index}>{key}</option>
            )
          })}
        </select>
      </div>
      <div className="col-auto">
        <input className="form-control" type="file" onChange={onFileChange} key={inputKey || ''} multiple id="fileUpload" />
      </div>
      <div className="col-auto">
        <Button type="submit" onClick={onFileUpload}>Upload</Button>
      </div>
    </div>
  );

  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h1>Uploaded Files</h1>
      <ul>
        {fileNames.map((item, index) => {
          return (
            <li key={item}>
              <h2 className='h2FileName'>{Path.basename(item)}</h2>
              <div >
                <FormRecongnizerResultDisplay model={model} fileURL={item} fileIndex={index} width={displayWidth} height={displayHeight} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className='container'>
      <br />
      <div className="container bg-light p-5">
        <h1>Upload files to Microsoft Form Recognizer</h1><br />
        {storageConfigured && !uploading && DisplayForm()}
        {storageConfigured && uploading && <div>Uploading</div>}
        <hr />
        {(storageConfigured && blobList.length > 0) && DisplayImagesFromContainer()}
        {!storageConfigured && <div>Storage is not configured.</div>}
      </div>
    </div>
  );
};

export default FileUpload;