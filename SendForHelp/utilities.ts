import { Platform } from 'react-native';

export const getDeepLink = (path = '') => {
  const scheme = 'sendforhelp';
  const prefix =
    Platform.OS == 'android'
      ? `${scheme}://http://54.242.127.157:3000`
      : `${scheme}://`;
  return prefix + path;
};
