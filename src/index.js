import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import NotFound from './components/NotFound'
import Order from './components/Order'

function getTotalPrice (pastries, totalPrice = 0) {
  return pastries.reduce((acc, p) => {
    return acc + p.price
  }, totalPrice)
}

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      pastries,
      order: {
        items: [],
        price: 0
      }
    }
    this.addToOrder = this.addToOrder.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
  }

  addToOrder (event) {
    event.preventDefault()
    console.log({target: event.target})
    const input = event.target.querySelector('input')
    const value = input.value

    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === value)
    const order = Object.assign({}, this.state.order)
    order.items.push(pastry)
    order.price = getTotalPrice(order.items, order.price)

    this.setState({
      order
    })

    console.log({event})
    console.log({type: event.type})
    console.log('added to order!')
  }

  clearOrder (event) {
    event.preventDefault()
    console.log({target: event.target})
    const order = Object.assign({}, this.state.order)
    order.items = []
    order.price = 0

    this.setState({
      order
    })
    console.log({event})
    console.log({type: event.type})
    console.log('cleared order!')
  }

  render () {
    return (
      <Router history={hashHistory}>
        <App>
          <Switch>
            <Route exact path='/' render={props => (
              <PastryList pastries={this.state.pastries} />
            )} />
            {/* Needs to be before :pastry so that it doesn't match there instead */}
            <Route exact path='/order' render={props => (
              <Order order={this.state.order} clear={this.clearOrder} />
            )} />
            <Route path='/:pastry' render={props => {
              const pastryName = props.match.params.pastry
              const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
              const pastry = pastries.find(p => p.name === pastryName)
              if (pastry) {
                return (
                  <PastryPage pastry={pastry} addToOrder={this.addToOrder} />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />

          </Switch>
        </App>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
