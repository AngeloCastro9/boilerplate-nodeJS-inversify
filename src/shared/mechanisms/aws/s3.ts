import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput, S3 } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getEnv } from '@core/constants';
import { IUploadOptions, IUploadResponse } from '@core/models/aws';

import { IntegrationError } from '@shared/errors';
import { LuxonHelper } from '@shared/helpers';

function getUniqueFilename (extension = ''): string {
  const timestamp = LuxonHelper.getCurrentTimestamp();
  const randomString = Math.random().toString().substring(3, 13);

  if (!extension) return `${timestamp}_${randomString}`;

  return `${timestamp}_${randomString}.${extension}`;
}

function getBucketPath (filename: string, folder = ''): string {
  if (folder) {
    return `${folder}/${filename}`;
  }

  return filename;
}

export class S3Amazon {
  static getInstance () {
    const instance = new S3({
      credentials: {
        accessKeyId: getEnv().aws.accessKey,
        secretAccessKey: getEnv().aws.secretKey,
      },
      region: getEnv().aws.bucket.region,
    });

    return instance;
  }

  static async getSignedUrl (filename: string, isUpload = false, folder?: string): Promise<string> {
    let response: string | null = null;

    try {
      const instance = S3Amazon.getInstance();

      const params = {
        Key: getBucketPath(filename, folder),
        Bucket: getEnv().aws.bucket.name,
      };

      const method = isUpload
        ? new PutObjectCommand(params)
        : new GetObjectCommand(params);

      response = await getSignedUrl(instance, method);

    } catch (err) {
      throw new IntegrationError('amazon-s3', err);
    }

    return response;
  }

  static async uploadBuffer (
    file: Buffer,
    extension: string,
    options: IUploadOptions = {}
  ): Promise<IUploadResponse> {
    let response = null;

    try {
      const key = options.filename ? options.filename : getUniqueFilename(extension);

      const params: PutObjectCommandInput = {
        Key: getBucketPath(key, options?.folder),
        Body: file,
        ContentEncoding: options.contentEncoding,
        ContentType: options.contentType,
        Bucket: getEnv().aws.bucket.name,
        ACL: options.isPrivate ? 'private' : 'public-read',
      };

      await S3Amazon.getInstance().putObject(params);
      const url = await S3Amazon.getSignedUrl(params.Key, false, options?.folder);

      response = {
        key: params.Key,
        bucket: params.Bucket,
        url,
      };

    } catch (err) {
      throw new IntegrationError('aws-s3', err);
    }

    return response;
  }
}