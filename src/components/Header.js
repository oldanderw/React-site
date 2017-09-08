import React from 'react'

  const Header= (props) =>{
    return (
      <header className="top">
        <h1>
          catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3><span>{props.slogan}</span></h3>
      </header>
    )
}
export default Header
