import React from 'react';

class Form extends React.Component {
  render(){
    return (
      <form onSubmit ={this.props.getWeather}>
        <input type='text' name='zip' placeholder='zipcode...'/>
        <button>Get Weather</button>
      </form>
    )
  }
}
export default Form;