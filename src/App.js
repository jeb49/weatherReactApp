import React from 'react';
import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";
import './App.css';
const appid = "88ce6f01ec307bc38b6c78b75832ad79"
class App extends React.Component {
  state={
    temp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async(event) => {
    event.preventDefault()
    const zip = event.target.elements.zip.value
    const weatherCall = await fetch("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&APPID=" + appid + '&units=imperial')
    if (weatherCall.status >= 200 && weatherCall.status < 300) {
      const data = await weatherCall.json()
      console.log(data)
      if (zip){
        this.setState({
          temp:  data.main.temp + '°F',
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: undefined
        })
      } 
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a valid zip."
      })
    }
  }

  render(){
    return (
      <body>
      <div>
          <div className="wrapper">
              <div className="main">
                  <div className="container">
                      <div className="row">
                          <div class='title'>
                              <Titles />  
                          </div>
                      </div>
                      <div className="row">
                          <div className="col form-container">
                                <div className = "col">                            
                                  <Form getWeather={this.getWeather}/>
                                </div>
                                <div className = "col">                            
                              <Weather
                                  temp={this.state.temp}
                                  city={this.state.city}
                                  country={this.state.country}
                                  humidity={this.state.humidity}
                                  description={this.state.description}
                                  error={this.state.error}
                                  />
                               </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </body>
    )
  }
}


export default App;
