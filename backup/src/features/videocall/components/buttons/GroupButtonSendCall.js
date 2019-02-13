import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SGroupButtonContainer } from '../SComponents'
import PropTypes from 'prop-types'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import theme from 'config/theme'

export default class GroupButtonSendCall extends React.Component {
  render() {
    const { isMute, isShowVideo, isVolumeUp } = this.props
    return (
      <SGroupButtonContainer>
        <TouchableOpacity onPress={() => this.props.onPressShowVideo()} style={styles.iconContainer}>
          <MCIcon name={isShowVideo ? 'video' : 'video-off'} size={32} color={theme.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onPressChangeVolume()} style={styles.iconContainer}>
          <FAIcon name={isVolumeUp ? 'volume-up' : 'volume-down'} size={32} color={theme.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onPressMute()} style={styles.iconContainer}>
          <FAIcon name={isMute ? 'microphone-slash' : 'microphone'} size={30} color={theme.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.onPressEndCall()}
          style={[styles.iconContainer, { backgroundColor: theme.red }]}
        >
          <MIcon name="call-end" size={35} color={theme.white} />
        </TouchableOpacity>
      </SGroupButtonContainer>
    )
  }
}

GroupButtonSendCall.propTypes = {
  onPressShowVideo: PropTypes.func.isRequired,
  onPressMute: PropTypes.func.isRequired,
  onPressEndCall: PropTypes.func.isRequired,
  onPressChangeVolume: PropTypes.func.isRequired,
  isShowVideo: PropTypes.bool.isRequired,
  isMute: PropTypes.bool.isRequired,
  isVolumeUp: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgIconColor,
  },
})
