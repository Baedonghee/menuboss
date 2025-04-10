import { ICode } from '../common';

export interface IMediaList {
  object?: string; // 오브젝트 이름
  mediaId: string; // 미디어 아이디
  type: ICode;
  name: string; // 미디어 이름
  property: {
    count?: number; // 폴더 파일 개수
    size: number; // 폴더 파일 전체 용량 (bytes)
    imageUrl: string;
    duration?: number;
  };
  updatedDate?: string; // 수정시간
  updatedAt?: string; // 수정시간
}

export interface IMediaUploadData {
  object?: string; // 오브젝트 이름
  mediaId: string; // 미디어 아이디
  type: ICode;
  name: string; // 미디어 이름
  property: {
    size: number; // 폴더 파일 전체 용량 (bytes)
    imageUrl: string;
  };
  updatedAt?: string; // 수정시간
}

export interface IMediaFile {
  object: string;
  mediaId: string;
  type: ICode;
  name: string;
  property: {
    width: number;
    height: number;
    size: number;
    duration: number;
    rotation: number;
    imageUrl: string;
    videoUrl: string;
    contentType?: string;
  };
  updatedAt: string;
}
