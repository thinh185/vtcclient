import React from 'react'
import { StatusBar, Text, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  StartColumnContainer,
  RowContainer,
} from 'components/common/SComponent'
import navigator from 'navigations/customNavigator'
import Utils from 'Utils'
import { listLiveStreamAction } from 'actions/userActions'
import { styleAuthen } from './styles'


class ContactLiveStreamScreen extends React.Component {
  componentDidMount() {
    this.props.listLiveStreamAction()
  }

  render() {
    return (
      <ScrollView>
        <Container style={styleAuthen.container}>
          <StatusBar barStyle="dark-content" />
          <StartColumnContainer>
            <RowContainer justifyContent="space-between" alignItems="center" style={{ paddingVertical: 20 }}>
              <RowContainer alignItems="center">
                <Image
                  style={stylesList.avatar}
                  source={require('../assets/man.png')}
                />
                <Text style={stylesList.user}>{this.props.user.username}</Text>
              </RowContainer>

              <TouchableOpacity onPress={() => {
                navigator.navigate('Stream')
              }}
              >
                <Text style={stylesList.live}>Begin Live</Text>
              </TouchableOpacity>
            </RowContainer>
            <StartColumnContainer>
              <Text style={stylesList.title}>Danh sách bạn bè đang live stream</Text>

              <FlatList
                data={this.props.list_live}
                renderItem={({ item }) => {
                  return (
                    <RowContainer justifyContent="space-between" alignItems="center">
                      <RowContainer alignItems="center">
                        <Image
                          style={stylesList.avatar}
                          source={require('../assets/female.png')}
                        />
                        <Text style={stylesList.user}>{item.username}</Text>
                      </RowContainer>
                      <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Viewer', { pathStream: item.userId })
                        Utils.setRoomName(item.roomName)
                      }}
                      >
                        <Text style={stylesList.live}>Xem live</Text>
                      </TouchableOpacity>
                    </RowContainer>
                  )
                }

              }
              />
            </StartColumnContainer>
          </StartColumnContainer>
        </Container>
      </ScrollView>
    )
  }
}

const stylesList = StyleSheet.create({
  live: {
    color: 'white',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: 'red',
    borderRadius: 8,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  user: {
    fontSize: 16,
    fontWeight: '300',
  },
})
const mapStateToProps = state => ({
  user: state.user.user,
  list_live: state.user.list_live,
})

export default connect(mapStateToProps, { listLiveStreamAction })(ContactLiveStreamScreen)
