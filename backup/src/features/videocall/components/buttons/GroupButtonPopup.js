import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import IIcon from 'react-native-vector-icons/Ionicons'
import theme from 'config/theme'
import { heightPopup } from '../../constains'

export default class GroupButtonPopup extends React.Component {
  render() {
    const { isMute, isShowVideo } = this.props
    return (
      <React.Fragment>
        {isShowVideo && (
          <TouchableOpacity onPress={() => this.props.onPressSwitchCamera()} style={styles.buttonReverse}>
            <View style={styles.iconContainer}>
              <IIcon
                name="ios-reverse-camera"
                size={18}
                color={theme.white}
                style={{ backgroundColor: 'transparent' }}
              />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => this.props.onPressExpand()} style={styles.buttonExpand}>
          <View style={styles.iconContainer}>
            <IIcon name="ios-expand" size={28} color={theme.white} style={{ backgroundColor: 'transparent' }} />
          </View>
        </TouchableOpacity>

        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.onPressShowVideo()}>
            <View style={styles.iconContainer}>
              <MCIcon name={isShowVideo ? 'video' : 'video-off'} size={16} color={theme.white} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onPressMute()}>
            <View style={styles.iconContainer}>
              <FAIcon name={isMute ? 'microphone-slash' : 'microphone'} size={14} color={theme.white} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onPressEndCall()}>
            <View style={[styles.iconContainer, { backgroundColor: theme.red }]}>
              <MIcon name="call-end" size={16} color={theme.white} />
            </View>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    )
  }
}

GroupButtonPopup.propTypes = {
  onPressShowVideo: PropTypes.func.isRequired,
  onPressMute: PropTypes.func.isRequired,
  onPressEndCall: PropTypes.func.isRequired,
  onPressSwitchCamera: PropTypes.func.isRequired,
  onPressExpand: PropTypes.func.isRequired,
  isShowVideo: PropTypes.bool.isRequired,
  isMute: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  buttonReverse: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
  },
  buttonExpand: {
    position: 'absolute',
    alignSelf: 'center',
    top: heightPopup / 2 - 24,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgIconColor,
    margin: 12,
  },
})
