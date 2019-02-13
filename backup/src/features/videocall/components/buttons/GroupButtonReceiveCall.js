import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SGroupButtonContainer } from '../SComponents'
import PropTypes from 'prop-types'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import theme from 'config/theme'

export default class GroupButtonReceiveCall extends React.Component {
  render() {
    return (
      <SGroupButtonContainer>
        <TouchableOpacity onPress={() => this.props.onPressAccept()} style={styles.iconContainer}>
          <MIcon name="call" size={40} color={theme.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.onPressReject()}
          style={[styles.iconContainer, { backgroundColor: theme.red }]}
        >
          <MIcon name="call-end" size={40} color={theme.white} />
        </TouchableOpacity>
      </SGroupButtonContainer>
    )
  }
}

GroupButtonReceiveCall.propTypes = {
  onPressAccept: PropTypes.func.isRequired,
  onPressReject: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.green,
  },
})
