import { extname } from 'path';
import * as fs from 'fs';
import { Request } from 'express';

export const editFileName = (
  req: Request,
  file: any,
  callback: (error: Error | null, filename: string) => void,
) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, `${uniqueSuffix}-${file.originalname}`);
};

export const handelfileFilter = (
  req: Request,
  file: any,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mkv'];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type'), false);
  }
};

export const deleteFile = (filePath: string): void => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};
