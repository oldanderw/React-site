import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import simpleFishes from './sample-fishes'
import Fish from './Fish'
import base from '../base'


class App extends React.Component {

  state = {
    fishes: {},
    order: {},
  }

  componentWillMount() {
    // This runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })

    // Check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)
    if (localStorageRef) {
      // Update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef),
      })
    }

  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order))
  }
  addFish =(fish)=> {
    // Update the state
    const copyFishes = {...this.state.fishes}
    // Add in new fish
    const timestamp = Date.now()
    copyFishes[`fish-${timestamp}`] = fish
    // Set state
    this.setState({fishes: copyFishes})
  }
  updatefish = (key, updatedfish)=> {
    const fishes = {...this.state.fishes}
    fishes[key] = updatedfish
    this.setState({fishes})
  }
  deleteFish =(key) => {
    const fishes = {...this.state.fishes}
    // Have to set to null because of the firebase database,
    // otherwise use the delete keyword
    fishes[key] = null
    this.setState({fishes})
  }
  deleteFromOrder = (key)=> {
    const order = {...this.state.order}
    delete order[key]
    this.setState({order})
  }
  loadSamples = () => {
    this.setState({fishes: simpleFishes})
  }
  addToOrder=(key)=> {
    // The ... make a copy of the state and puts it into the const
    const copyOrder = {...this.state.order}
    copyOrder[key] = copyOrder[key] + 1 || 1
    console.log(key)
    this.setState({order: copyOrder})
  }
  render() {
    return (
      // One big div around the app cuz react must keep to one parent element
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header slogan='The Shit Market'/>
          <ul className='list-of-fishes'>
            {
              // To make a list from a state is .map also index is used cuz
              // you are not allowed to touch key so we make a copy for ourself
              Object.keys(this.state.fishes)
                .map(key =>
                  <Fish
                    key={key}
                    index={key}
                    info={this.state.fishes[key]}
                    addToOrder={this.addToOrder}/>
                )
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
          params={this.props.params}/>

         <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updatefish={this.updatefish}
          deleteFish={this.deleteFish}
        />
      </div>
    )
  }
}
App.propTypes = {
  params: React.PropTypes.object.isRequired,
}
export default App
