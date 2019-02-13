import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { UserTitle } from 'features/user/components'
import PropTypes from 'prop-types'
import { SActionButton, SActionButtonText } from './SComponents'
import theme from 'config/theme'
import { TYPE_VIDEO, TYPE_VOICE } from '../constains'
export default class ItemFriend extends Component {
  render() {
    const { user, onPress } = this.props
    return (
      <View style={styles.container}>
        <UserTitle user={user} />
        <Text>{user.active ? 'Online' : 'Offline'}</Text>
        <View style={styles.buttonList}>
          <SActionButton backgroundColor={'#90EE90'} onPress={() => onPress(user, TYPE_VOICE)}>
            <SActionButtonText color={theme.black} style={{ paddingHorizontal: 5 }}>
              Call
            </SActionButtonText>
          </SActionButton>
          <SActionButton backgroundColor={'#90EE90'} onPress={() => onPress(user, TYPE_VIDEO)}>
            <SActionButtonText color={theme.black} style={{ paddingHorizontal: 5 }}>
              Video
            </SActionButtonText>
          </SActionButton>
        </View>
      </View>
    )
  }
}

ItemFriend.propTypes = {
  user: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonList: {
    flexDirection: 'row',
  },
})
