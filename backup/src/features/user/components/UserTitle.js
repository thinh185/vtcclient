import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import React from 'react'
import theme from 'config/theme'

export default ({ user }) => {
  return (
    <View style={styles.container}>
      <Icon name="face" type="MaterialCommunityIcons" fontSize={20} />
      <Text style={styles.text}>{user.username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 20,
    fontSize: 16,
    color: theme.black,
  },
})
