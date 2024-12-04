
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';

const s3Client = new S3Client({
    region: 'us-east-1',
    // credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    // },
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = async (file) => {

    // open file from path
    const fileStream = fs.readFileSync(file.path);

    const paramsUploads = {
        Bucket: 'tads-2024-webii',
        Key: file.filename,
        Body: fileStream.buffer,
        // ContentType: file.mimetype,
    }

    try {
        const { Location } = await s3Client.send(new PutObjectCommand(paramsUploads));
        return Location;
    } catch (error) {
        console.log('Error uploading file:', error);
        return null;
    }
}

export { uploadFile };