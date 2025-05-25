const NodeMediaServer = require('node-media-server');

const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    allow_origin: '*',
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg', 
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: false,
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();
