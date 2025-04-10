import { IUploadList } from '@repo/ui/types';
import { FileWithPath } from 'react-dropzone';
import { atom, DefaultValue, selector } from 'recoil';

interface IUploadState {
  list: IUploadList[];
  completedList: IUploadList[];
  tempList: IUploadList[];
  fileList: {
    id: string;
    file: FileWithPath;
  }[];
  folderId?: string;
  uploadProgress: boolean;
  uploadModalOpen: boolean;
}

const uploadAtom = atom<IUploadState>({
  key: 'uploadAtom',
  default: {
    list: [],
    completedList: [],
    tempList: [],
    fileList: [],
    folderId: undefined,
    uploadProgress: false,
    uploadModalOpen: false
  }
});

const uploadListSelector = selector<IUploadList[]>({
  key: 'uploadListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      list: newValue
    }));
  },
  get: ({ get }) => {
    const { list } = get(uploadAtom);
    return list;
  }
});

const uploadCompletedListSelector = selector<IUploadList[]>({
  key: 'uploadCompletedListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      completedList: newValue
    }));
  },
  get: ({ get }) => {
    const { completedList } = get(uploadAtom);
    return completedList;
  }
});

const uploadTempListSelector = selector<IUploadList[]>({
  key: 'uploadTempListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      tempList: newValue
    }));
  },
  get: ({ get }) => {
    const { tempList } = get(uploadAtom);
    return tempList;
  }
});

const uploadFileListSelector = selector<
  {
    id: string;
    file: FileWithPath;
  }[]
>({
  key: 'uploadFileListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      fileList: newValue
    }));
  },
  get: ({ get }) => {
    const { fileList } = get(uploadAtom);
    return fileList;
  }
});

const uploadFolderIdSelector = selector<string | undefined>({
  key: 'uploadFolderIdSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      folderId: newValue
    }));
  },
  get: ({ get }) => {
    const { folderId } = get(uploadAtom);
    return folderId;
  }
});

const uploadProgressSelector = selector<boolean>({
  key: 'uploadProgressSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      uploadProgress: newValue
    }));
  },
  get: ({ get }) => {
    const { uploadProgress } = get(uploadAtom);
    return uploadProgress;
  }
});

const uploadModalOpenSelector = selector<boolean>({
  key: 'uploadModalOpenSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(uploadAtom, (prevState) => ({
      ...prevState,
      uploadModalOpen: newValue
    }));
  },
  get: ({ get }) => {
    const { uploadModalOpen } = get(uploadAtom);
    return uploadModalOpen;
  }
});

export {
  uploadAtom,
  uploadListSelector,
  uploadCompletedListSelector,
  uploadTempListSelector,
  uploadFileListSelector,
  uploadFolderIdSelector,
  uploadProgressSelector,
  uploadModalOpenSelector
};
