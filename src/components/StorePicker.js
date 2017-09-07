import React from 'react'
import {getFunName} from '../helpers'

class StorePicker extends React.Component {
  // contructor(){
  //   super()
  //   this.goToStore = this.goToStore.bind(this)
  // }
  goToStore(event) {
    event.preventDefault();
    console.log(this.storeInput.value)
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        <h2>Please enter a store</h2>
        {/* doing (input)=>this.storeInput = input} is fine for when the component appears once but if it appears a again then the same function is make and can slow down the page. use a contructor instead  */}
        <input type="text" required placeholder="Store name" defaultValue={getFunName()} ref={(input)=>this.storeInput = input}/>
        <button type="submit">Vist store</button>
      </form>
    )
  }
}
export default StorePicker
