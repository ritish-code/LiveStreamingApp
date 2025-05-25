import React from 'react';
import { View, Button } from 'react-native';
import LiveStream from 'react-native-live-stream';

export default function GoLive() {
  const streamUrl = 'rtmp://192.168.113.176/live/mystream';

  return (
    <View style={{ flex: 1 }}>
      <LiveStream
        style={{ flex: 1 }}
        cameraFronted={true}
        streamUrl={streamUrl}
        started={true}
      />
      <Button title="End Stream" onPress={() => {/* logic to stop */}} />
    </View>
  );
}
