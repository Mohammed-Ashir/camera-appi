// src/components/SavedMediaScreen.js
import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import useStore from '../state/useStore';

const SavedMedia = () => {
  const {savedMedia} = useStore();
  console.log('first savedMedia', savedMedia);
  return (
    <View>
      <FlatList
        data={savedMedia}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            {item.type === 'photo' && (
              <Image
                source={{uri: item.uri}}
                style={{width: 100, height: 100}}
              />
            )}
            {item.type === 'video' && <Text>Video: {item.uri}</Text>}
          </View>
        )}
      />
    </View>
  );
};

export default SavedMedia;
