import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { newMessage, previousMessages } from '../../api/ChatRoute'
import firebase from 'firebase';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatUpdated: false,
      messages: [],
    };
  }
  getNewMessages = async () => {
    try {
      const message = await firebase
        .firestore()
        .collection('Chat')
        .doc(this.props.navigation.state.params.item.roomKey)

      message.onSnapshot((QuerySnapshot) => {
        let currentMessages = QuerySnapshot.data().messages
        if (currentMessages.length === 0) return ''//covers no messages edge

        let latestMessage = currentMessages[currentMessages.length - 1]

        latestMessage.createdAt = latestMessage.createdAt.toDate()
        if (this.state.messages.length === 0) {
          this.setState({
            messages: [latestMessage]
          })
        }


        if (latestMessage.createdAt.toString() === this.state.messages[0].createdAt.toString()) {
          return ''
        }//covers first render edge to avoid duplicate
        else {
          this.setState({
            messages: [latestMessage, ...this.state.messages]
          })
        }
      })
    }

    catch (error) {
      console.error(error)
    }
  }
  async componentDidMount() {
    try {
      let loadChat = await previousMessages(this.props.navigation.state.params.item.roomKey)
      loadChat.messages.reverse()
      loadChat.messages.forEach((current) => {
        let date = current.createdAt.toDate()
        current.createdAt = date
      })
      this.setState({
        messages: loadChat.messages
      })
      this.getNewMessages()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userKey,
          name: this.props.user.UserName
        }}
      />
    );
  }

  async onSend(messages) {

    let user = this.props.userKey
    messages[0].author = user
    let messageObject = {
      _id: messages[0]._id,
      text: messages[0].text,
      user: {
        _id: user,
        name: this.props.user.UserName
      },
      createdAt: messages[0].createdAt
    }

    newMessage(this.props.navigation.state.params.item.roomKey, messageObject)
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }))
  }
}

const mapStateToProps = function (state) {
  return {
    user: state.user.user,
    userKey: state.user.userKey
  }
}
export default connect(
  mapStateToProps,
  null)
  (Chat);
