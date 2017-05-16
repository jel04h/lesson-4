import React from 'react'
import './Order.css'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

class Order extends React.Component {
  render () {
    const theOrder = this.props.order

    const pastries = theOrder.items.map((pastry) => // .map does the same thing for everything in a list - pastry is pastry for all pastries in the list of pastries.
      <tr>
        <td>{pastry.name}</td>
        <td>{formatPrice(pastry.price)}</td>
        <td>{pastry.quantity}</td>
      </tr>
    )

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
              {pastries}
            </tbody>
          </table>
          <p>total price: {formatPrice(theOrder.price)}</p>
          <button>Check out</button>
          <form method='POST' action='/orders' onSubmit={this.props.clear}>
            <input type='hidden' value='clear' />
            <input type='submit' value='Clear' />
          </form>
        </ul>
      </div>
    )
  }
}

export default Order
