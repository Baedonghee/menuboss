import { ICode } from '../common';

interface TimeRange {
  start: string;
  end: string;
}

export interface IPlayList {
  object: string;
  playlistId: number;
  name: string;
  time: TimeRange;
  property: {
    count: number;
    imageUrl: string;
    contentTypes: ICode[];
    direction: {
      code: 'Horizontal' | 'Vertical';
      name: string;
    };
  };
  updatedDate: string;
}

export interface IPlayListItem {
  object: string;
  playlistId: number;
  name: string;
  property: {
    direction: ICode;
    fill: ICode;
  };
  contents: IPlayListItemContent[];
  updatedAt: string;
}

export interface IPlayListItemContent {
  id: string;
  contentId: string;
  type: ICode;
  duration: number;
  name: string;
  property: {
    size?: number;
    imageUrl: string;
  };
}

export interface IAddPlayList {
  name?: string;
  property: {
    direction: 'Horizontal' | 'Vertical';
    fill: 'Fill' | 'Fit' | 'Stretch';
  };
  contents: {
    contentId: string;
    duration: number;
  }[];
}

export interface IPreviewList {
  imageUrl?: string;
  videoUrl?: string;
  duration: number;
}
