// 서버에러인지 클라이언트에러인지 체크
export const getCustomErrorMessage = (error: any): string | undefined => {
  if (error.isAxiosError) {
    return error.response?.data?.message || undefined;
  }
  return undefined;
};
