import React from 'react'
import {formatPrice} from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group'


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
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeBotton}
        </span>
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
      <div className="order-wrap" >
        <h2>Your orders</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
          {orderId.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>

      </div>
    )
  }
}
export default Order
