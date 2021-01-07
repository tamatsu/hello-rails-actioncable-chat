import consumer from "../channels/consumer" // Action Cable. see https://railsguides.jp/action_cable_overview.html

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const domContainer = document.querySelector('#app');


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
  if (model.socket) {
    const item = {
      id: uuidv4(),
      content: '' + value
    }

    model.items.push(item)
  }

  return model
}

function add({ model }) {
  if (model.socket && model.newText) {
    const item = {
      id: uuidv4(),
      content: model.newText
    }
  
    model.newText = ''
    model.socket.chat(item.content)
  }

  return model
}

function inputNewText({ model, args: value }) {
  model.newText = value

  return model
}

// View
function view({ model, msg }) {
  return <div>
    { console.log('->', model), ''}
    { model.socket ? '' : 'Connecting...' }
    <form onSubmit={e => { e.preventDefault(); msg(add) }}>
      <input value={model.newText} onInput={e => msg(inputNewText, e.target.value)} />
      <button>+</button>
    </form>
    <div>
      { model.items.map(item => viewItem({ item })) }
    </div>
  </div>
}

function viewItem({ item }) {
  return <div key={item.id}>
    { item.content }
  </div>
}