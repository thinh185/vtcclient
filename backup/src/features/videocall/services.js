/* eslint-disable import/no-duplicates */
import { Platform } from 'react-native'
import {
  getUserMedia,
  MediaStreamTrack,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc'
import { socket } from './socketConfig'
import InCallManager from 'react-native-incall-manager'

const configuration = {
  iceServers: [
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
  ],
}
let pcPeers = {}
let localStream
let remoteList = {}

function getLocalStream(isFront, callback) {
  let videoSourceId
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources((sourceInfos) => {
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i]
        if (sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
          videoSourceId = sourceInfo.id
        }
      }
    })
  }
  getUserMedia(
    {
      audio: true,
      video: {
        mandatory: {
          minWidth: 640, // Provide your own width, height and frame rate here
          minHeight: 360,
          minFrameRate: 30,
        },
        facingMode: isFront ? 'user' : 'environment',
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    },
    function(stream) {
      localStream = stream
      callback(stream)
    },
    logError
  )
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds) {
    for (const i in socketIds) {
      const socketId = socketIds[i]
      createPC(socketId, true)
    }
  })
}

function createOffer(peerConnection, socketId) {
  peerConnection.createOffer(function(desc) {
    peerConnection.setLocalDescription(
      desc,
      function() {
        socket.emit('exchange', {
          to: socketId,
          sdp: peerConnection.localDescription,
        })
      },
      logError
    )
  }, logError)
}

function exchange(data) {
  const fromId = data.from
  let peerConnection
  if (fromId in pcPeers) {
    peerConnection = pcPeers[fromId]
  } else {
    peerConnection = createPC(fromId, false)
  }

  if (data.sdp) {
    peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.sdp),
      function() {
        if (peerConnection.remoteDescription.type === 'offer')
          peerConnection.createAnswer(function(desc) {
            peerConnection.setLocalDescription(
              desc,
              function() {
                socket.emit('exchange', { to: fromId, sdp: peerConnection.localDescription })
              },
              logError
            )
          }, logError)
      },
      logError
    )
  } else {
    peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
  }
}

function leave(socketId) {
  const peerConnection = pcPeers[socketId]
  if (peerConnection) {
    peerConnection.close()
  }
  delete pcPeers[socketId]
  delete remoteList[socketId]
}

function logError(error) {
  console.log('logError', error)
}

function mapHash(func) {
  const array = []
  for (const key in remoteList) {
    const obj = remoteList[key]
    array.push(func(obj, key))
  }
  return array
}

function getStats() {
  const peerConnection = pcPeers[Object.keys(pcPeers)[0]]
  if (peerConnection) {
    if (peerConnection.getRemoteStreams()[0] && peerConnection.getRemoteStreams()[0].getAudioTracks()[0]) {
      const track = peerConnection.getRemoteStreams()[0].getAudioTracks()[0]
      peerConnection.getStats(
        track,
        function(report) {
          console.log('getStats report')
        },
        logError
      )
    }
  }
}

// Action for peer connection
function onIceCandidate(event, socketId) {
  if (event.candidate) {
    socket.emit('exchange', { to: socketId, candidate: event.candidate })
  }
}

function onNegotiationNeeded(peerConnection, socketId, isOffer) {
  if (isOffer) {
    createOffer(peerConnection, socketId)
  }
}

function onIceConnectionStateChange(event, peerConnection, socketId) {
  console.log('oniceconnectionstatechange')
  if (event.target.iceConnectionState === 'completed') {
    setTimeout(() => {
      getStats()
    }, 1000)
  }
  if (event.target.iceConnectionState === 'connected') {
    createDataChannel(peerConnection, socketId)
  }
}

function onAddStream(event, socketId) {
  remoteList[socketId] = event.stream.toURL()
}

function createDataChannel(peerConnection) {
  if (peerConnection.textDataChannel) {
    return
  }
  const dataChannel = peerConnection.createDataChannel('text')

  dataChannel.onerror = (error) => {
    console.log('dataChannel.onerror', error)
  }

  dataChannel.onmessage = (event) => {
    console.log('dataChannel.onmessage')
  }

  dataChannel.onopen = () => {
    console.log('dataChannel.onopen')
  }

  dataChannel.onclose = () => {
    console.log('dataChannel.onclose')
  }

  peerConnection.textDataChannel = dataChannel
}

function createPC(socketId, isOffer) {
  const peerConnection = new RTCPeerConnection(configuration)
  pcPeers[socketId] = peerConnection

  peerConnection.onicecandidate = (event) => onIceCandidate(event, socketId)

  peerConnection.onnegotiationneeded = () => onNegotiationNeeded(peerConnection, socketId, isOffer)

  peerConnection.oniceconnectionstatechange = (event) => onIceConnectionStateChange(event, peerConnection, socketId)

  peerConnection.onsignalingstatechange = (event) => {
    console.log('onsignalingstatechange', event.target.signalingState)
  }

  peerConnection.onaddstream = (event) => onAddStream(event, socketId)

  peerConnection.onremovestream = (event) => {
    console.log('onremovestream')
  }

  if (localStream) {
    peerConnection.addStream(localStream)
  }

  return peerConnection
}

function getRemoteList() {
  return remoteList
}

function switchCamera() {
  if (localStream) {
    let tracks = localStream.getVideoTracks()
    if (tracks.length > 0) {
      tracks.forEach((track) => {
        track._switchCamera()
      })
    }
  }
}

function turnOffCamera(isShow) {
  if (localStream) {
    let tracks = localStream.getVideoTracks()
    if (tracks.length > 0) {
      tracks.forEach((track) => {
        track.enabled = isShow
      })
    }
  }
}

function setMute(mute) {
  if (localStream) {
    let tracks = localStream.getVideoTracks()
    if (tracks.length > 0) {
      if (Platform.OS === 'android') {
        InCallManager.setMicrophoneMute(mute) // --- use incall manager to turn on/off mic
      } else {
        tracks.forEach((track) => {
          track.enabled = !mute
        })
      }
    }
  }
}

function resetAll() {
  turnOffCamera(true)
  setMute(false)
  pcPeers = {}
  localStream = null
  remoteList = {}
}

module.exports = {
  join,
  getLocalStream,
  mapHash,
  leave,
  exchange,
  getRemoteList,
  resetAll,
  switchCamera,
  turnOffCamera,
  setMute,
}
