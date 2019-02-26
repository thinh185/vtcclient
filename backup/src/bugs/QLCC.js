import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity } from 'react-native'
import {
  Container,
  StartColumnContainer,
  SearchContainer,
  SText,
  SIcon,
  SInput,
  SBeginLiveButton,
  RowContainer,
} from 'features/share/component/SComponent'
import { Query } from 'react-apollo'
import { Flatlist } from 'react-native'
import LiveStreamQl from 'features/livestream/LiveStreamQl'
import { searchUser } from 'features/livestream/LiveStreamAction'
import { logoutAction } from 'features/authentication/AuthenAction'
import navigator from 'navigation/CustomNavigator'
import FriendLiveStream from './FriendLiveStream'
import InputComment from './InputComment'
class ListLiveStreamContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keySearch: '',
      pageNumber: 1,
    }
  }
  logout = () => {
    this.props.logoutAction()
    navigator.navigate('Login')
  }

  loadResultSearch = (keySearch, pageNumber) => {
    this.props.searchUser({
      username: keySearch.trim(),
      pageConfig: { pageNumber },
    })
  }

  search = (keySearch) => {
    this.setState({ keySearch })
  }

  listFriend = () => {
    return (
      <Query
        query={LiveStreamQl.searchQl}
        variables={{
          username: this.state.keySearch.trim(),
        }}
      >
        {({ data, fetchMore }) => {
          return (
            <Flatlist
              data={data}
              keyExtractor={(item) => item.message}
              renderItem={({ item }) => <FriendLiveStream friend={item} />}
              onEndReached={async () => {
                if (this.onEndReachedCalledDuringMomentum === false) {
                  await this.setState({ pageNumber: this.setState.pageNumber + 1 })
                  fetchMore({
                    variables: {
                      pageConfig: { pageNumber: this.setState.pageNumber },
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev
                      return Object.assign({}, prev, {
                        data: [...prev.data, ...fetchMoreResult.data],
                      })
                    },
                  })
                  this.onEndReachedCalledDuringMomentum = true
                }
              }}
              onEndReachedThreshold={0.5}
            />
          )
        }}
      </Query>
    )
  }

  render() {
    return (
      <Container flexDirection="column" justifyContent="center">
        <ScrollView>
          <StartColumnContainer justifyContent="center" flexValue="1" marginHorizontal="10">
            <RowContainer alignItems="center" justifyContent="space-between">
              <SText fontSize="30" fontWeight="500" color="black" textAlign="left" paddingVertical="8">
                LiveStream
              </SText>
              <TouchableOpacity onPress={this.logout}>
                <SIcon source={require('assets/logout.png')} />
              </TouchableOpacity>
            </RowContainer>
            <SearchContainer>
              <SIcon source={require('assets/search.jpg')} />
              <SInput
                noBorder
                placeholder="Tìm kiếm"
                fontSize="18"
                value={this.state.keySearch}
                onChangeText={(keySearch) => this.search(keySearch)}
              />
            </SearchContainer>
          </StartColumnContainer>
          <StartColumnContainer marginHorizontal="10" flexValue="2">
            {this.search()}
          </StartColumnContainer>
        </ScrollView>
        <InputComment />

        <SBeginLiveButton onPress={() => console.log('vcl')}>
          <TouchableOpacity>
            <SIcon width="60" height="60" source={require('assets/beginLive.png')} />
          </TouchableOpacity>
        </SBeginLiveButton>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  notificationToken: state.auth.notificationToken,
  me: state.auth.user,
})

export default connect(
  mapStateToProps,
  { logoutAction }
)(ListLiveStreamContainer)
