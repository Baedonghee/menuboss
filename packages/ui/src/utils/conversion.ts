export const conversion = {
  kilobytesToMegabytes: (bytes: number) => {
    const bytesToKilobytes = (bytes: number) => {
      const kilobytes = bytes / 1024;
      return Math.round(kilobytes * 10) / 10; // 소수점 셋째 자리에서 반올림하여 소수점 둘째 자리까지 표시
    };

    if (bytes === 0) {
      return '0 KB';
    } else if (bytes < 1024 * 1024) {
      // 1MB 미만인 경우 KB로 변환
      const kilobytes = bytesToKilobytes(bytes);
      return kilobytes + ' KB';
    } else {
      // 1MB 이상인 경우 MB로 변환
      const megabytes = bytes / (1024 * 1024);
      return Math.round(megabytes * 10) / 10 + ' MB';
    }
  }
};
