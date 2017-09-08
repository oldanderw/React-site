import React from 'react'
import {formatPrice} from '../helpers'

class Fish extends React.Component {
  render() {
    const {info} = this.props
    return (
      <li className="menu-fish">
        <img src={info.image} alt={info.name}/>
        <h3 className="fish-name">
          {info.name}
          <span className="price">{formatPrice(info.price)}</span>
        </h3>
        <p>{info.desc}</p>
        <button>Add to Order</button>
      </li>
    )
  }
}
export default Fish
