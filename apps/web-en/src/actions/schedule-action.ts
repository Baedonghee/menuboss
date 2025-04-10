import { IApi, IApiList, IScheduleDetail, IScheduleForm, IScheduleList } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import scheduleApi from '@/api/client/schedule.json';
import { scheduleAtom, scheduleDetailSelector, scheduleListSelector } from '@/state/schedule';
import axios from '@/utils/client/axios';

function useScheduleActions() {
  const setSchedule = useSetRecoilState(scheduleAtom);
  const setScheduleList = useSetRecoilState(scheduleListSelector);
  const setScheduleDetail = useSetRecoilState(scheduleDetailSelector);

  async function scheduleList() {
    try {
      const url = scheduleApi.schedules;
      const {
        data: { list }
      }: AxiosResponse<IApiList<IScheduleList[]>> = await axios.get(url);
      setSchedule({
        list,
        loading: false,
        detail: null
      });
    } catch (err) {
      throw err;
    }
  }

  async function getSchedule(scheduleId: number) {
    try {
      const url = scheduleApi.getSchedule.replace(':id', scheduleId.toString());
      const {
        data: { data }
      }: AxiosResponse<IApi<IScheduleDetail>> = await axios.get(url);
      setScheduleDetail(data);
    } catch (err) {
      throw err;
    }
  }

  async function addSchedule(formData: IScheduleForm) {
    try {
      const url = scheduleApi.addSchedule;
      await axios.post(url, formData);
    } catch (err) {
      throw err;
    }
  }

  async function updateSchedule(scheduleId: string, formData: IScheduleForm) {
    try {
      const url = scheduleApi.updateSchedule.replace(':id', scheduleId);
      await axios.patch(url, formData);
    } catch (err) {
      throw err;
    }
  }

  async function deleteSchedule(scheduleId: number) {
    try {
      const url = scheduleApi.deleteSchedule.replace(':id', scheduleId.toString());
      await axios.delete(url);
      setScheduleList((prevState) => prevState.filter((item) => item.scheduleId !== scheduleId));
    } catch (err) {
      throw err;
    }
  }

  async function scheduleNameUpdate(scheduleId: number, name: string) {
    try {
      await axios.patch(scheduleApi.updateScheduleName.replace(':id', scheduleId.toString()), {
        name
      });
      setScheduleDetail((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            name
          };
        }
        return prevState;
      });
      setScheduleList((prevState) => {
        return prevState.map((item) => {
          if (item.scheduleId === scheduleId) {
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

  async function reset() {
    setSchedule({
      detail: null,
      list: [],
      loading: true
    });
  }

  return {
    scheduleList,
    getSchedule,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    scheduleNameUpdate,
    reset
  };
}

export { useScheduleActions };
