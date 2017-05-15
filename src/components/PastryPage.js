import React from 'react'
import './PastryPage.css'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

class PastryPage extends React.Component {
  constructor () {
    super()
    this.addToOrder = this.addToOrder.bind(this) // makes it reference the inside instead of the outside of the function
  }

  addToOrder (e) {
    e.preventDefault()
    console.log(this.pastryName.value)
  }

  render () {
    const { pastry } = this.props
    return (
      <div className='pastry-page'>
        <div className='pastry-container'>
          <div className='pastry-img-container'>
            <img src={pastry.image} alt={pastry.name} />
          </div>
          <div className='pastry-info'>
            <h5 className='name'>{pastry.name}</h5>
            <p className='description'>{pastry.description}</p>
            <div className='price'>{formatPrice(pastry.price)}</div>
          </div>
        </div>
        <form method='POST' action='/order' className='add-to-order' onSubmit={this.addToOrder}>
          <input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
          <button type='submit'>Add to Order</button>
        </form>
      </div>
    )
  }
}

export default PastryPage
