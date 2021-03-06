import React from "react";

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      chatText: "",
      username: "",
    }
  }

  componentWillMount() {
    this.gameId = sessionStorage.getItem("gameId");
    this.fbUser = sessionStorage.getItem("fbUser");
    this.setState({username: this.fbUser})

    // this.userId = sessionStorage.getItem('userId');

    socket.emit("subscribe", this.gameId);
    var self = this
    socket.on("chat message", (msg) => self.setState({messages: self.state.messages.concat(msg)}));
  }

  _handleSubmit(e) {
    var self = this
    e.preventDefault()

    this.gameId = sessionStorage.getItem("gameId");
    socket.emit("send", {
      room   : this.gameId,
      name   : self.state.username ? self.state.username : self.props.player.name,
      message: this.state.chatText,
    })

    // clear input after each msg
    this.setState({
      chatText: ""
    })
  }

  render() {
    return (
      <div className="chatBox">
        <div className="messages">
          <form onSubmit={this._handleSubmit.bind(this)}>
            <input
              type="text"
              value={this.state.chatText}
              className="u-full-width"
              placeholder="chat..."
              id="chatInput"
              onChange={event => this.setState({chatText: event.target.value})}
							/>

            <input type="submit" style={{visibility: "hidden"}}></input>
          </form>
          <table className="table table-hover">
            <tbody>
              {
                this.state.messages.map(function (msg,index) {
                  return (
                    <Message key={index} name={msg.name} message={msg.message}/>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

class Message extends React.Component {
  render() {
    return (
      <tr className="message">
        <td className="text-left">{this.props.name}</td>
        <td className="text-right">{this.props.message}</td>
      </tr>
    )
  }
}
