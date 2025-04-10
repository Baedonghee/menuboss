import { ICode } from '../common';
import { IPlayList } from '../playlists';

export interface IScheduleList {
  object: string; // object name
  name: string; // 스케줄 이름
  updatedDate: string; // 스케줄 수정시간
  property: {
    count: number; // 플레이리스트 개수
    imageUrl: string; // 대표 이미지 URL
    contentTypes: ICode[];
  };
  scheduleId: number; // 스케줄 고유번호
}

export interface IScheduleSettingList {
  name: string; // 스케줄 이름
  time: {
    start: string; // 시작 시간
    end: string; // 종료 시간
  };
  playlist?: IPlayList;
}

export interface IScheduleSettingKoList {
  name: string; // 스케줄 이름
  time: {
    start: string; // 시작 시간
    end: string; // 종료 시간
  };
  playlist?: IPlayList;
}

export interface IScheduleForm {
  name?: string;
  playlists: ({
    playlistId: number;
    time?: {
      start: string;
      end: string;
    };
  } | null)[];
}

interface TimeRange {
  start: string;
  end: string;
}

export interface ISchedulePlaylist {
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

export interface IScheduleDetail {
  object: string;
  scheduleId: number;
  name: string;
  playlists: ISchedulePlaylist[];
  updatedAt: string;
}

export interface IScheduleDetailKo {
  object: string;
  scheduleId: number;
  name: string;
  playlists: ISchedulePlaylist[];
  updatedAt: string;
}
