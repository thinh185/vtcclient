import React from 'react'
import { StatusBar, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import navigator from 'navigation/CustomNavigator'
import {
  Container,
  StartColumnContainer,
  RowContainer,
  SLabel,
  STextLive,
  SHeading,
} from '../features/share/component/SComponent'
import { listLiveStreamAction } from '../features/livestream/LiveStreamAction'
import Header from '../features/share/component/Header'

class ContactLiveStreamScreen extends React.Component {
  componentDidMount() {
    this.props.listLiveStreamAction()
  }

  renderItem = (item) => {
    return (
      <RowContainer justifyContent="space-between" alignItems="center">
        <RowContainer alignItems="center">
          <Image style={styles.avatar} source={require('../assets/female.png')} />
          <SLabel>{item.username}</SLabel>
        </RowContainer>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Viewer', {
              pathStream: item.userId,
              roomName: item.roomName,
            })
          }}
        >
          <STextLive>Xem live</STextLive>
        </TouchableOpacity>
      </RowContainer>
    )
  }

  render() {
    return (
      <ScrollView>
        <Container paddingVertical="20">
          <StatusBar barStyle="dark-content" />
          <Header />
          <StartColumnContainer>
            <RowContainer justifyContent="space-between" alignItems="center">
              <RowContainer alignItems="center">
                <Image style={styles.avatar} source={require('../assets/man.png')} />
                <SLabel>{this.props.user.username}</SLabel>
              </RowContainer>

              <TouchableOpacity
                onPress={() => {
                  navigator.navigate('Streamer')
                }}
              >
                <STextLive>Begin Live</STextLive>
              </TouchableOpacity>
            </RowContainer>
            <StartColumnContainer>
              <SHeading>Danh sách bạn bè đang live stream</SHeading>

              <FlatList
                data={this.props.list_live}
                renderItem={({ item }) => {
                  this.renderItem(item)
                }}
              />
            </StartColumnContainer>
          </StartColumnContainer>
        </Container>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
})
const mapStateToProps = (state) => ({
  user: state.user.user,
  list_live: state.stream.list_live,
})

export default connect(
  mapStateToProps,
  { listLiveStreamAction }
)(ContactLiveStreamScreen)
