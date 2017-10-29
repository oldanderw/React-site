import React from 'react'

const Header = (props) => {
  return (
    <header className='top'>
        <h1>
          catch
          <span className='ofThe'>
            <span className='of'>of</span>
            <span className='the'>the</span>
          </span>
          Day
        </h1>
        <h3 className='slogan'><span>{props.slogan}</span></h3>
      </header>
  )
}

Header.propTypes = {
  slogan: React.PropTypes.string.isRequired,
};
export default Header
