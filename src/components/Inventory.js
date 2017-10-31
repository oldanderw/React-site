import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types'

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null,
    }
  }

  handleChance = (e, key) => {
    const fish = this.props.fishes[key]
    const updatedfish = {...fish, [e.target.name]: e.target.value}
    this.props.updatefish(key, updatedfish)
  };
  renderInventory =(key)=> {
    const fish = this.props.fishes[key]
    return (
      <div className='fish-edit' key={key}>
        <input
          type='text'
          name='name'
          onChange={(e) => this.handleChance(e, key)}
          value={fish.name}
          placeholder='Fish Name' />
        <input
          type='text'
          name='price'
          onChange={(e) => this.handleChance(e, key)}
          value={fish.price}
          placeholder='Fish Price' />
        <select
          name='status'
          onChange={(e) => this.handleChance(e, key)}
          value={fish.status}>
          <option
            value='available'>
            Fresh!
          </option>
          <option
            value='unavailable'>
            Sold Out!
          </option>
        </select>
        <textarea
          name='desc'
          onChange={(e) => this.handleChance(e, key)}
          value={fish.desc}
          placeholder='Fish Desc'></textarea>
        <input
          name='image'
          onChange={(e) => this.handleChance(e, key)}
          value={fish.image}
          type='text'
          placeholder='Fish Image'/>
        <button
          onClick={() => this.props.deleteFish(key)}>
          Remove Fish
        </button>
      </div>
    )
  };
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}
Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updatefish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
}
export default Inventory;
