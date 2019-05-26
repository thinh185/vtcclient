import React, { Component } from 'react'
import { PopupCallContainer } from 'features/videocall/component/index'
import PopupContainerHOC from 'features/share/HOC/PopupContainerHOC'
import { connect } from 'react-redux'
import { heightPopup, widthPopup } from 'features/videocall/VideoCallConstant'
import navigator from '../../../navigation/CustomNavigator'
const PopupComponent = PopupContainerHOC(PopupCallContainer)

const MainContainerHOC = (Navigator) => {
  class MainContainer extends Component {
    render() {
      return (
        <React.Fragment>
          <Navigator {...this.props} ref={(navigatorRef) => navigator.setContainer(navigatorRef)} />
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
        </React.Fragment>
      )
    }
  }
  const mapStateToProps = (state) => ({
    isKeepCall: state.videoCall.isKeepCall,
  })

  return connect(
    mapStateToProps,
    {}
  )(MainContainer)
}

export default MainContainerHOC
