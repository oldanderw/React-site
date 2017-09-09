import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import simpleFishes from './sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  constructor(){
    super()
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.state = {
      fishes: {},
      order: {}
    }
  }
   componentWillMount() {
     // this runs right before the <App> is rendered
     this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
       context: this,
       state: 'fishes'
     });

     // check if there is any order in localStorage
     const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

     if(localStorageRef) {
       // update our App component's order state
       this.setState({
         order: JSON.parse(localStorageRef)
       });
     }

   }

   componentWillUnmount() {
     base.removeBinding(this.ref);
   }

   componentWillUpdate(nextProps, nextState) {
     localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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
  addToOrder(key){
    const copyOrder = {...this.state.order}
    copyOrder[key] = copyOrder[key] + 1 || 1
    this.setState({order: copyOrder})
  }
 render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header slogan="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} info={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}
export default App
