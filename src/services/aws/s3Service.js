const {s3Client} = require('../../../config/awsConfig');
const {PutObjectCommand,DeleteObjectCommand} =require( "@aws-sdk/client-s3");
var fs = require('fs');
const moment=require("moment")


const uploadToS3 = async (files) => {

  const uploadSingleFile = async (file) => {
    try {
      const currentDate = moment().format('YYYYMMDDHHmmss');
      const randomString = Math.random().toString(36).substring(2, 8); // Generate a random 6-character string
      const fileExtension = file.originalname.split('.').pop();
      
      const uniqueFileName = `${currentDate}_${randomString}.${fileExtension}`;
      const command = new PutObjectCommand({
        Bucket:  process.env.AWS_S3_BUCKET_NAME,
        Key: uniqueFileName,
        Body: file.buffer,
      });

       await s3Client.send(command);

      return uniqueFileName;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err; // Rethrow the error for Promise.all to catch
    }
  };
  

// Upload Multiple files to S3 in parallel
const uploadedFileUrls = await Promise.all(
  files.map(async (file) => {
    try {
      return await uploadSingleFile(file);
    } catch (err) {
      console.error('Error uploading file:', err);
      return null; // Return null for failed uploads
    }
  })
);

return uploadedFileUrls;

};

const getImagesFromS3 = async (filenames) => {
  // Get Real imageURl from filenames
  return filenames.map(url=>`${process.env.CLOUDFRONT_DOMAIN}/${url}`)
};


async function deleteS3Object(objectKey) {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: objectKey,
    };

    const command = new DeleteObjectCommand(params);

    const response = await s3Client.send(command);

    console.log(`Object ${objectKey} deleted successfully from S3 bucket ${process.env.AWS_S3_BUCKET_NAME}`);
  
    return response;
  } catch (error) {
    console.error("Error deleting object:", error);
  }
}


module.exports = {
  uploadToS3,
  getImagesFromS3,
  deleteS3Object
};
