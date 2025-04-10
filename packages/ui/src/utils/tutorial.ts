export const setTutorialLocalStorage = (value: string) => {
  const getItem = window.localStorage.getItem('tutorial');
  if (getItem === null) {
    const setItem = {
      [value]: true
    };
    window.localStorage.setItem('tutorial', JSON.stringify(setItem));
  } else {
    const parseItem = JSON.parse(getItem);
    const setItem = {
      ...parseItem,
      [value]: true
    };
    window.localStorage.setItem('tutorial', JSON.stringify(setItem));
  }
};
