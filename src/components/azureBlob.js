import {BlobServiceClient} from '@azure/storage-blob';

const sasToken = process.env.storagesastoken || "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-10-01T05:48:44Z&st=2022-08-14T21:48:44Z&spr=https&sig=nTzUN%2BUA2GWVb4mrdzRhtmjA%2FGFgj6YxPucXwDrvSjU%3D"; // Fill string with your SAS token
const containerName = 'test';
const storageAccountName = process.env.storageresourcename || "msftfr"; // Fill string with your Storage resource name

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !((!storageAccountName || !sasToken));
};

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient) => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
};


const createBlobInContainer = async (containerClient, file) => {
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
  await blobClient.setMetadata({UserName : 'shubham'});
};

const uploadFileToBlob = async (file) => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

  // upload file
  await createBlobInContainer(containerClient, file);
    
  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;