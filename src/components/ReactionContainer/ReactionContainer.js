import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
// import { Card } from 'react-native-paper'

import Reaction from './Reaction'
import styles from './styles'

export default class ReactionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.types = [
      { key: '1', type: 'Laugh' },
      { key: '2', type: 'Wow' },
      { key: '3', type: 'Angry' },
      { key: '4', type: 'Like' },
      { key: '5', type: 'ThumpUp' },
      { key: '6', type: 'crying' },

    ]
  }

    renderItem = ({ item, index }) => {
      return <Reaction type={item.type} index={index} />
    };

    render() {
      return (
        <View style={styles.card} {...this.props}>
          <FlatList
            data={this.types}
            horizontal
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
            bounces={false}
            style={styles.list}
          />
        </View>
      )
    }
}
