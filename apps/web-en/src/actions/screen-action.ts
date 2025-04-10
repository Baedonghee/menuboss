import { IApiList, IScreenApplyForm, IScreenList } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import screenApi from '@/api/client/screen.json';
import { screenAtom, screenListSelector } from '@/state/screen';
import axios from '@/utils/client/axios';

function useScreenActions() {
  const setScreen = useSetRecoilState(screenAtom);
  const setScreenList = useSetRecoilState(screenListSelector);

  async function screenList() {
    try {
      const url = screenApi.screens;
      const {
        data: { list }
      }: AxiosResponse<IApiList<IScreenList[]>> = await axios.get(url);
      setScreen({
        list,
        loading: false
      });
    } catch (err) {
      throw err;
    }
  }

  async function screenApply(formData: IScreenApplyForm) {
    try {
      const url = screenApi.screensApply;
      await axios.post(url, formData);
    } catch (err) {
      throw err;
    }
  }

  async function deleteScreen(screenId: number) {
    try {
      const url = screenApi.deleteScreen.replace(':id', String(screenId));
      await axios.delete(url);
      setScreenList((prevState) => prevState.filter((screen) => screen.screenId !== screenId));
    } catch (err) {
      throw err;
    }
  }

  async function screenNameUpdate(screenId: number, name: string) {
    try {
      await axios.patch(screenApi.updateScreenName.replace(':id', screenId.toString()), { name });
      setScreenList((prevState) => {
        return prevState.map((item) => {
          if (item.screenId === screenId) {
            return {
              ...item,
              name
            };
          }
          return item;
        });
      });
    } catch (err) {
      throw err;
    }
  }

  async function createScreen(code: string) {
    try {
      const url = screenApi.createScreen.replace(':id', code);
      await axios.post(url);
    } catch (err) {
      throw err;
    }
  }

  async function showScreen(screenId: number) {
    try {
      const url = screenApi.showScreen.replace(':id', String(screenId));
      await axios.post(url);
    } catch (err) {
      throw err;
    }
  }

  async function reset() {
    setScreen({
      list: [],
      loading: true
    });
  }

  return {
    screenList,
    screenApply,
    deleteScreen,
    screenNameUpdate,
    createScreen,
    showScreen,
    reset
  };
}

export { useScreenActions };
