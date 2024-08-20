import fs from "fs";
import { lookup } from "mime-types";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

export class AWS_S3Client {
  constructor() {
    this._client = new S3Client({
      region: process.env.AWS_REGION,
    });
  }

  async upload(bucketName, name, objectPath) {
    if (!bucketName) {
      console.error("No bucket name provided in environment variables.");
      return null;
    }

    const params = {
      Bucket: bucketName,
      Body: fs.createReadStream(objectPath),
      Key: name,
      ContentType: lookup(objectPath) || "text/plain",
    };

    try {
      // Send the PutObjectCommand to S3
      const data = await this._client.send(new PutObjectCommand(params));

      return { result: data };
    } catch (err) {
      // Log the detailed error for troubleshooting
      console.error("Error put objects:", err);
      return Promise.reject(err);
    }
  }

  async list(bucketName) {
    if (!bucketName) {
      console.error("No bucket name provided in environment variables.");
      return null;
    }

    const params = {
      Bucket: bucketName,
    };

    try {
      // Send the ListObjectsV2Command to S3
      const data = await this._client.send(new ListObjectsV2Command(params));

      // Extract object keys if Contents exists
      const objectKeys = data.Contents
        ? data.Contents.map((obj) => obj.Key)
        : [];

      return { objectKeys: objectKeys };
    } catch (err) {
      // Log the detailed error for troubleshooting
      console.error("Error listing objects:", err);
      return Promise.reject(err);
    }
  }
}
