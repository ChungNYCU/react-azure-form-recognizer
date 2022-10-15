[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ChungNYCU/react-azure-form-recognizer/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]() [![](https://img.shields.io/github/last-commit/ChungNYCU/react-azure-form-recognizer)](https://github.com/ChungNYCU/react-azure-form-recognizer/commits/master)

# react-azure-form-recognizer

This repository is for user evaluate Microsoft Form Recognizer, and provide React components allow them integrate the service into their own system.


#### Contents

- [Overview](#1-overview)
- [Problem](#2-problem)
- [Solution](#3-solution)
- [Documentation](#4-documentation)
  - [Getting start](#41-getting-start)

## Overview

In this repository, we provide react components to visualization complex data format. Our goals are reduce user perception time and allow them to modify incorrect value from Microsoft Form Recognizer and extract them as a React props. We also provide accuracy about Microsoft Form Recognizer's result to help users evaluate the service.

Live demo website: https://react-msft-form-recognizer.azurewebsites.net/


## Problem

### Barriers to entry
When faced with Microsoft officail documentation, non-technical users need an easy-to-understand usage example. Integrating services into existing systems is also a challenge when users do not have a technical team.

### Complex information
Microsoft form recognizer’s return data is JSON format. As a non-technical user, JSON format is hard to read and evaluate.

Example:
![](https://i.imgur.com/7yTaitn.png)


## Solution

We decided to develop reusable components based on the React framework so that users can integrate them into their own systems or websites. Components can visualize results to reduce user perception time, demonstrate accuracy, quantify data, and help users decide whether to use the service.

### Component-connector diagram
![](https://i.imgur.com/itMbkXW.png)


## Documentation

### Getting start

Clone this repository and create `.env.local` file in the directory like example below.
```
REACT_APP_API_KEY1 = 'Your Microsoft Form Recognizer key'
REACT_APP_API_KEY2 = 'Your Microsoft Form Recognizer key'
REACT_APP_ENDPOINT = 'Your Microsoft Form Recognizer endpoint'
REACT_APP_STORAGE_SAS_TOKEN = 'Your Microsoft storage sas token'
REACT_APP_STORAGE_CONTAINER_NAME = 'Your Microsoft storage container name'
REACT_APP_STORAGE_RESOURCE_NAME = 'Your Microsoft storage resource name'
```


### Props

| Props name      | Parameter?   | Type       | Description                                               |
| -------------   |--------------|------------|-----------------------------------------------------------|
| model           | Required     | String     | Model id provided from Microsoft Form Recognizer service. |
| fileURL         | Required     | String     | Publicly accessible file URL.                             |
| width           | Required     | Number     | Preferred display width.                                  |
| height          | Required     | Number     | Preferred display height.                                 |
| fileIndex       | Not required | Number     | If upload multiple files.                                 |


### Usage

Here's an example of basic usage:
```js
import FormRecongnizerResultDisplay from './FormRecongnizerResultDisplay';

const [model, setModel] = useState('prebuilt-receipt');
const fileURL = 'https://msftfr.blob.core.windows.net/test/0.png';
const fileIndex = 0;
const displayWidth = 450;
const displayHeight = 800;

const DisplayReceipt = () => (
    <div>
        <FormRecongnizerResultDisplay 
            model={model} fileURL={item} fileIndex={fileIndex} 
            width={displayWidth} height={displayHeight} />
    </div>
  );
```

You can get below result:

![](https://i.imgur.com/DoZb8di.gif)

