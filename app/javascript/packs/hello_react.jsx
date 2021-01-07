import consumer from "../channels/consumer" // Action Cable. see https://railsguides.jp/action_cable_overview.html

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const domContainer = document.querySelector('#app');
const userId = document.querySelector('#user').dataset.user

// React
const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = init({ msg: this.msg.bind(this) })
  }

  render() {
    return view({ model: this.state, msg: this.msg.bind(this)})
  }

  msg(f, args) {
    this.setState(f({ model: this.state, args }))
  }
}

ReactDOM.render(e(App), domContainer);


// Model
function init({ msg }) {
  consumer.subscriptions.create("ChatChannel", {
    connected() {
      msg(connected, this)
    },
  
    disconnected() {
    },
  
    received(data) {
      msg(received, data)
    },
  
    chat(str) {
      this.perform('chat', { message: str })
    }
  });

  return {
    items: [],
    newText: '',
    socket: null
  }
}

function connected({ model, args: socket }) {
  model.socket = socket

  return model
}

function received({ model, args: value }) {
  const { user, content } = value

  if (model.socket) {
    const item = {
      id: uuidv4(),
      user: '' + user,
      content: '' + content
    }

    model.items.push(item)
  }

  return model
}

function add({ model }) {
  if (model.socket && model.newText) {
    model.socket.chat(model.newText)

    model.newText = ''
  }

  return model
}

function inputNewText({ model, args: value }) {
  model.newText = value

  return model
}

// View
function view({ model, msg }) {
  return <div style={{maxWidth: '480px'}}>
    { console.log('->', model), ''}
    { model.socket ? '' : 'Connecting...' }
    <form 
      onSubmit={e => { e.preventDefault(); msg(add) }}
      className="flex"
    >
      <input
        value={model.newText}
        onInput={e => msg(inputNewText, e.target.value)}
        className="p-2 border rounded"
        placeholder="Type your message here..."
      />
      <button className="rounded p-1 bg-green-200">Send</button>
    </form>
    <div>
      { model.items.map(item => viewItem({ item })) }
    </div>
  </div>
}

function viewItem({ item }) {
  if (item.user === userId) {
    return <div className="border-b border-dotted" key={item.id}>
      <div className="font-bold text-sm">
        Visitor { item.user.slice(0, 6) }
      </div>
      <div>
        { item.content }
      </div>
    </div>
  }
  else {
    return <div className="border-b border-dotted" key={item.id}>
      <div className="flex justify-end">
        <div className="font-bold text-sm">
          Visitor { item.user.slice(0, 6) }
        </div>
      </div>
      <div className="flex justify-end">
        <div>
          { item.content }
        </div>
      </div>
    </div>
  }

}