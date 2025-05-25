import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

export default function WatchLive() {
  const hlsUrl = 'http://192.168.113.176:8000/live/mystream.m3u8';

  return (
    <View style={{ flex: 1 }}>
      <Video
        source={{ uri: hlsUrl }}
        controls
        resizeMode="contain"
        style={{ flex: 1 }}
      />
    </View>
  );
}
