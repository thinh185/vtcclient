import { View, Text, StyleSheet } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import theme from 'config/theme'

export default ({ user, content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MCIcon name="face" size={100} color="blue" />
      </View>
      <Text style={styles.textUserName}>{user.username}</Text>
      <Text style={styles.textContent}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    borderWidth: 3,
    borderColor: theme.grey,
    backgroundColor: theme.mainBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textUserName: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.white,
    paddingVertical: 10,
  },
  textContent: {
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 20,
    color: theme.white,
  },
})
