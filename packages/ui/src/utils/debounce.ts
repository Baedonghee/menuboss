/* eslint-disable @typescript-eslint/no-this-alias */
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    const context = this;

    const later = () => {
      timeoutId = undefined as any;
      func.apply(context, args);
    };

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);
  };
};
