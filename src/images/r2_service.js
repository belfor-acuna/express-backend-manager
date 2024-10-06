import pkg from 'aws-sdk'; 
const { S3 } = pkg;  

import dotenv from 'dotenv';

dotenv.config();


const s3 = new S3({
  endpoint: process.env.R2_ENDPOINT,  
  accessKeyId: process.env.R2_ACCESS_KEY_ID,  
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY, 
  signatureVersion: 'v4',  
});

export const uploadImageToR2 = async (file, fileName) => {
  const params = {
    Bucket: process.env.R2_BUCKET_NAME, 
    Key: fileName,  
    Body: file.buffer, 
    ContentType: file.mimetype,  
    ACL: 'public-read', 
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; 
  } catch (err) {
    throw new Error('Error uploading file to R2');
  }
};
