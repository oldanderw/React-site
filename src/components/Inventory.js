import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base'

class Inventory extends React.Component {
  constructor(){
    super();
    this.state = {
      uid: null,
      owner: null
    }
  }

  handleChance = (e, key) =>{
    const fish = this.props.fishes[key]
    const updatedfish = {...fish, [e.target.name]: e.target.value}
    this.props.updatefish(key, updatedfish)
  };

  authenticate = (provider) =>{
    console.log(`trying to log in with ${provider}`);
    base.auth().signInWithRedirect(provider);
  };
  authHandler= (err, authData) => {
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }
  };
  renderLogin = () => {
        const provider = new base.auth.FacebookAuthProvider();

    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate(provider)} >Log In with Facebook</button>
        {/* <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button> */}
      </nav>
    )
  };
  renderInventory =(key)=>{
    const fish = this.props.fishes[key]
    return(
      <div className="fish-edit" key={key}>
        <input type="text" name="name" onChange={(e) => this.handleChance(e, key)} value={fish.name} placeholder="Fish Name" />
        <input type="text" name="price" onChange={(e) => this.handleChance(e, key)} value={fish.price} placeholder="Fish Price" />
        <select name="status" onChange={(e) => this.handleChance(e, key)} value={fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={(e) => this.handleChance(e, key)} value={fish.desc} placeholder="Fish Desc" ></textarea>
        <input name="image" onChange={(e) => this.handleChance(e, key)} value={fish.image} type="text" placeholder="Fish Image" />
        <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
      </div>
    )
  };
  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // check if they are no logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}
Inventory.propTypes = {
  fishes:React.PropTypes.object.isRequired,
  updatefish:React.PropTypes.func.isRequired,
  deleteFish:React.PropTypes.func.isRequired,
  addFish:React.PropTypes.func.isRequired,
  loadSamples:React.PropTypes.func.isRequired
}
export default Inventory;
