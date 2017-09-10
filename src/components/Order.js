import React from 'react'
import {formatPrice} from '../helpers'
class Order extends React.Component {
  constructor(){
    super()
    this.renderOrder = this.renderOrder.bind(this)
  }
  renderOrder(key){
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const removeBotton = <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>;

    if(!fish || fish.status === 'unavailable'){
      return <li key={key}>get fucked, sold out {removeBotton}</li>
    }
    return(
      <li key={key}>
        <span>{count}lbs {fish.name} {removeBotton}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )

  }
  render() {
    const orderId = Object.keys(this.props.order)
    const total = orderId.reduce((prevTotal, key) =>{
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const soldOrNot = fish && fish.status === 'available'
      if(soldOrNot){
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Your orders</h2>
        <ul className="order">
          {orderId.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>

      </div>
    )
  }
}
export default Order
