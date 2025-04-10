export interface IUploadList {
  name: string;
  size: number;
  progress: number;
  fileProgress: number;
  result: 'progress' | 'success' | 'error';
  imageUrl: string;
  type: 'image' | 'video';
  file: File;
  id: string;
  folderId?: string;
}
