import React from 'react'
import {formatPrice} from '../helpers'

class Fish extends React.Component {
  render() {
    const {info, index} = this.props
    const soldOrNot = info.status === 'available'
    const buttonText = soldOrNot ? 'Add to Order' : 'Sold out'
    return (
      <li className="menu-fish">
        <img src={info.image} alt={info.name}/>
        <h3 className="fish-name">
          {info.name}
          <span className="price">{formatPrice(info.price)}</span>
        </h3>
        <p>{info.desc}</p>
        <button disabled={!soldOrNot} onClick={() => this.props.addToOrder(index)}>{buttonText}</button>
      </li>
    )
  }
}
export default Fish
