import { IOption } from '@repo/ui/types';

export const hourList: IOption[] = Array.from({ length: 24 }, (_, index) => {
  const paddedIndex = index.toString().padStart(2, '0'); // Add leading zero if needed
  return {
    value: paddedIndex,
    name: paddedIndex
  };
});

export const minuteList: IOption[] = Array.from({ length: 60 }, (_, index) => {
  const paddedIndex = index.toString().padStart(2, '0'); // Add leading zero if needed
  return {
    value: paddedIndex,
    name: paddedIndex
  };
});
