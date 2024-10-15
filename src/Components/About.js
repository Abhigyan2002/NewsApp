import React, { Component } from 'react'

export default class About extends Component {
    setTitle(){
        document.title=('About-Newzz');
    }
  render() {
    this.setTitle();
    return (
        
      <div className='container'>
        <h1>About us</h1>
        <p>This app is made by Abhigyan Chakraborty. It is a react project with react router implementation as well. Hope you like it!</p>
      </div>
    )
  }
}
