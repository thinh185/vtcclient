import React, { Component } from 'react'
import { View } from 'react-native'
import { PopupCallContainer } from 'features/videocall/components/index'
import PopupContainerHOC from 'features/videocall/components/HOC/PopupContainerHOC'
import { connect } from 'react-redux'
import { heightPopup, widthPopup } from '../../constains'

const PopupComponent = PopupContainerHOC(PopupCallContainer)

const MainContainerHOC = (Comp) => {
  class MainContainer extends Component {
    render() {
      console.log('keep call hay khong', this.props.isKeepCall)
      return (
        <View style={{ flex: 1 }}>
          {this.props.isKeepCall && (
            <PopupComponent
              corner={2}
              paddingDragComponent={10}
              dragComponentStyle={{
                height: heightPopup,
                width: widthPopup,
                zIndex: 10,
                position: 'absolute',
              }}
            />
          )}
          <Comp {...this.props} />
        </View>
      )
    }
  }
  const mapStateToProps = (state) => ({
    isKeepCall: state.authSocket.isKeepCall,
  })

  return connect(
    mapStateToProps,
    {}
  )(MainContainer)
}

export default MainContainerHOC
