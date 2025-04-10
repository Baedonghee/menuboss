import {
  IApi,
  IApiList,
  ICanvasDetail,
  ICanvasForm,
  ICanvasImage,
  ICanvasList
} from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import canvasApi from '@/api/client/canvas.json';
import fileApi from '@/api/client/file.json';
import { authUserSelector } from '@/state/auth';
import { canvasAtom, canvasDetailSelector, canvasListSelector } from '@/state/canvas';
import axios from '@/utils/client/axios';
import fileAxios from '@/utils/client/file-axios';

function useCanvasActions() {
  const user = useRecoilValue(authUserSelector);
  const setCanvas = useSetRecoilState(canvasAtom);
  const setCanvasList = useSetRecoilState(canvasListSelector);
  const setCanvasDetail = useSetRecoilState(canvasDetailSelector);

  async function canvasList(canvasId?: string) {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<ICanvasList[]>> = await axios.get(canvasApi.list);
      const newList = canvasId ? [...list.filter((item) => item.canvasId !== canvasId)] : [...list];
      setCanvas((prevState) => ({
        ...prevState,
        list: newList,
        loading: false
      }));
    } catch (err) {
      throw err;
    }
  }

  async function canvasImageUpload(file: File) {
    try {
      if (user) {
        const token = atob(user.authorization.accessToken);
        const { data }: AxiosResponse<IApi<ICanvasImage>> = await fileAxios.post(
          fileApi.canvasImage,
          {
            file
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-User-Id': user.memberId,
              Authorization: `Bearer ${token}`,
              'x-Device-Model': window.navigator.userAgent
            }
          }
        );
        if (data.status === 200) {
          return data.data.imageId;
        } else {
          throw data;
        }
      } else {
        throw 'Not found user';
      }
    } catch (err) {
      throw err;
    }
  }

  async function canvasCreate(formData: ICanvasForm) {
    try {
      await axios.post(canvasApi.create, formData);
    } catch (err) {
      throw err;
    }
  }

  async function canvasDelete(canvasId: string) {
    try {
      await axios.delete(canvasApi.delete.replace(':id', canvasId));
      setCanvasList((prevState) => prevState.filter((canvas) => canvas.canvasId !== canvasId));
    } catch (err) {
      throw err;
    }
  }

  async function canvasDetail(canvasId: string, returnType?: boolean) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<ICanvasDetail>> = await axios.get(
        canvasApi.detail.replace(':id', canvasId)
      );
      if (returnType) {
        return data;
      }
      setCanvasDetail(data);
    } catch (err) {
      throw err;
    }
  }

  async function canvasUpdate(canvasId: string, formData: ICanvasForm) {
    try {
      await axios.patch(canvasApi.update.replace(':id', canvasId), formData);
    } catch (err) {
      throw err;
    }
  }

  async function canvasNameUpdate(canvasId: string, name: string) {
    try {
      await axios.patch(canvasApi.updateName.replace(':id', canvasId), { name });
      setCanvasList((prevState) =>
        prevState.map((canvas) => {
          if (canvas.canvasId === canvasId) {
            return {
              ...canvas,
              name
            };
          }
          return canvas;
        })
      );
    } catch (err) {
      throw err;
    }
  }

  function canvasListReset() {
    setCanvas((prevState) => ({
      ...prevState,
      list: [],
      loading: true
    }));
  }

  async function reset() {
    setCanvas((prevState) => ({
      ...prevState,
      list: [],
      detail: null,
      loading: true,
      submitting: false,
      previewSubmitting: false
    }));
  }

  return {
    canvasImageUpload,
    canvasCreate,
    canvasList,
    canvasDelete,
    canvasDetail,
    canvasUpdate,
    canvasNameUpdate,
    reset,
    canvasListReset
  };
}

export { useCanvasActions };
