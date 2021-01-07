// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const domContainer = document.querySelector('#app');


// React
const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = init()
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
function init() {
  return {
    items: [],
    newText: ''
  }
}

function add({ model }) {
  const item = {
    id: uuidv4(),
    content: model.newText
  }

  model.newText = ''
  model.items.push(item)

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
    <form onClick={e => { e.preventDefault(); msg(add) }}>
      <input value={model.newText} onInput={e => msg(inputNewText, e.target.value)} />
      <button>+</button>
    </form>
    <div>
      { model.items.map(item => viewItem({ item })) }
    </div>
  </div>
}

function viewItem({ item }) {
  return <div>
    { item.content }
  </div>
}