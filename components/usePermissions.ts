import {useCallback} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';

export const usePermissions = () => {
  const checkPermission = async (permission: Permission) => {
    return (await check(permission))?.includes(RESULTS.GRANTED);
  };
  const requestPermission = async (permission: Permission) => {
    return (await request(permission))?.includes(RESULTS.GRANTED);
  };

  const checkCameraPermission = useCallback(async () => {
    return Platform.OS === 'ios'
      ? await checkPermission(PERMISSIONS.IOS.CAMERA)
      : await checkPermission(PERMISSIONS.ANDROID.CAMERA);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    return Platform.OS === 'ios'
      ? await requestPermission(PERMISSIONS.IOS.CAMERA)
      : await requestPermission(PERMISSIONS.ANDROID.CAMERA);
  }, []);

  return {
    checkCameraPermission,
    requestCameraPermission,
  };
};
