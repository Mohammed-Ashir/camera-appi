// src/components/CameraComponent.js
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  AppState,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {usePermissions} from './usePermissions';
import useStore from '../state/useStore';

const CameraComponent = ({navigation}) => {
  // const devices = useCameraDevices();
  const {checkCameraPermission, requestCameraPermission} = usePermissions();
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('front');
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to display images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestStoragePermission();
  const updateCameraPermission = useCallback(() => {
    const init = async () => {
      const permissionStatus = await checkCameraPermission();
      setHasPermission(permissionStatus);
    };
    init();
  }, [checkCameraPermission]);
  useEffect(() => {
    if (!hasPermission) {
      requestCameraPermission();
    }
  }, [hasPermission, requestCameraPermission]);
  useEffect(() => {
    updateCameraPermission();
    const listener = AppState.addEventListener('change', async state => {
      if (state === 'active') {
        updateCameraPermission();
      }
    });
    return () => {
      listener.remove();
    };
  }, [updateCameraPermission]);

  const saveMedia = () => {
    if (photoUri) {
      console.log('photo uri uri', photoUri);
      useStore.getState().addMedia({type: 'photo', uri: `file:${photoUri}`});
      setPhotoUri(null);
    }
    if (videoUri) {
      console.log('photo uri uri', videoUri);

      useStore.getState().addMedia({type: 'video', uri: videoUri});
      setVideoUri(null);
    }
  };

  const capturePhoto = async () => {
    if (camera) {
      const photo = await camera.takePhoto();
      setPhotoUri(photo.path);
      console.log('photo', photo.path, photoUri);
    }
  };

  const recordVideo = async () => {
    if (camera) {
      const video = await camera.startRecording();
      setVideoUri(video.path);
    }
  };

  const stopRecording = async () => {
    if (camera) {
      await camera.stopRecording();
    }
  };

  if (!device) return <Text>Loading camera...</Text>;

  return (
    <View>
      <Camera
        ref={setCamera}
        style={{width: '100%', height: '50%'}}
        device={device}
        isActive={true}
        photo={true}
        video={true}
      />
      {photoUri && (
        <Image
          source={{
            uri: `file:${photoUri}`,
          }}
          style={{width: 100, height: 100}}
        />
      )}
      {videoUri && (
        <View>
          <Text>Video ready. {videoUri}</Text>
          {/* Video player implementation should go here */}
        </View>
      )}
      <Button title="Capture Photo" onPress={capturePhoto} />
      <Button title="Record Video" onPress={recordVideo} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <Button title="Save Media" onPress={saveMedia} />
      <Button
        title="Go to Saved Media"
        onPress={() => navigation.navigate('SavedMedia')}
      />
    </View>
  );
};

export default CameraComponent;
