import { Platform } from 'react-native';

export const getDeepLink = (path = '') => {
  const scheme = 'my-scheme';
  const prefix =
    Platform.OS == 'android'
      ? `${scheme}://http://3079bba2004c.ngrok.io/`
      : `${scheme}://`;
  return prefix + path;
};
