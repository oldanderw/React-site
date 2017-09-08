import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import simpleFishes from './sample-fishes'
import Fish from './Fish'

class App extends React.Component {
  constructor(){
    super()
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.state = {
      fishes: {},
      order: {}
    }
  }
  addFish(fish){
    // update the state
    const copyFishes = {...this.state.fishes}
    //add in new fish
    const timestamp = Date.now()
    copyFishes[`fish-${timestamp}`] = fish
    //set state
    this.setState({fishes: copyFishes})
  }
  loadSamples(){
    this.setState({fishes: simpleFishes})
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header slogan="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} info={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}
export default App
