import React from 'react'
import './Order.css'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

class Order extends React.Component {
  constructor () {
    super()
    this.addToOrder = this.addToOrder.bind(this)
  }

  addToOrder (e) {
    e.preventDefault()
    console.log(this.pastryName.value)
  }

  render () {
    const allpastries = this.props.pastry
    const theorder = this.props.order
    return (
      <div className='order'>
        <ul className='order'>
          <h2>Basket</h2>
          <hr />
          <table className='order-table'>
            <thead>
              <tr>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>remove pastry</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{allpastries[4].name}</td>
                <td>price</td>
                <td>quantity</td>
                <td><button>remove</button></td>
              </tr>
            </tbody>
          </table>
          <p>total price: </p>
          <button>Check out</button>
        </ul>
      </div>
    )
  }
}

export default Order
