export const importFileandPreview = (file: File, revoke?: boolean): Promise<string> => {
  return new Promise((resolve) => {
    window.URL = window.URL || window.webkitURL;
    const preview = window.URL.createObjectURL(file);
    // remove reference
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 100);
  });
};

export const generateVideoThumbnails = async (
  videoFile: File,
  numberOfThumbnails: number
): Promise<string[]> => {
  const thumbnail: string[] = [];
  const fractions: number[] = [];

  if (!videoFile.type?.includes('video')) throw new Error('not a valid video file');

  const duration = await getVideoDuration(videoFile);

  // divide the video timing into particular timestamps in respective to number of thumbnails
  for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
    fractions.push(Math.floor(i));
  }

  const promiseArray = fractions.map((time) => {
    return getVideoThumbnail(videoFile, time);
  });

  try {
    const res = await Promise.all(promiseArray);
    res.forEach((res) => {
      thumbnail.push(res);
    });
    return thumbnail;
  } catch (err) {
    console.error(err);
  } finally {
    return thumbnail;
  }
};

const getVideoThumbnail = (file: File, videoTimeInSeconds: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.type.match('video')) {
      importFileandPreview(file).then((urlOfFIle) => {
        const video = document.createElement('video');
        const timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });

        const snapImage = function () {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL();
          const success = image.length > 100000;
          if (success) {
            URL.revokeObjectURL(urlOfFIle);
            resolve(image);
          }
          return success;
        };

        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = urlOfFIle;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.currentTime = videoTimeInSeconds;
        video.play();
      });
    } else {
      reject('file not valid');
    }
  });
};

export const getVideoDuration = (videoFile: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (videoFile) {
      if (videoFile.type.match('video')) {
        importFileandPreview(videoFile).then((url) => {
          const video = document.createElement('video');
          video.addEventListener('loadeddata', function () {
            resolve(video.duration);
          });
          video.preload = 'metadata';
          video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
        });
      }
    } else {
      reject(0);
    }
  });
};
