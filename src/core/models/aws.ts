export interface IGetUploadParams {
  Key: string;
  Expires: number;
  ACL: string;
  Bucket: string;
}

export interface IUploadOptions {
  contentEncoding?: string;
  contentType?: string;
  isPrivate?: boolean;
  filename?: string;
  folder?: string;
}

export interface IUploadResponse {
  key: string;
  bucket: string;
  url: string;
}