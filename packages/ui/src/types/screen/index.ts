export interface IScreenList {
  object: string; // object name
  screenId: number; // Screen unique number
  name: string; // screen name
  content: {
    type: 'Schedule' | 'Playlist'; // Content type (Schedule, Playlist)
    name: string; // content name
    imageUrl: string; // Content representative image URL
  };
  isOnline: boolean; // Is online?
  updatedDate: string;
}

export interface IScreenApplyForm {
  screenIds: number[];
  contentType: 'Schedule' | 'Playlist';
  contentId: number;
}
