import { Component} from 'react';
import Search from '../search/search';
import NavBar from '../navBar/navBar';

import './App.css';


const apiKey = "2dc31685918e2e379a284c376c27aeba",
      base = "https://api.openweathermap.org/data/2.5/"


class App extends Component {
  state = {
    weathers: {},
    query: ''
  }


  dataBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;


  }
  // Устанавливает значение с инпута
  setQuery = (data) => {
    this.setState({
      query: data
    })
  }

  // Устанавливает погоду с сервера
  setWether = (data) => {
    this.setState({
      weathers: data
    })
  }


  // Метод для получение данных с сервера
  search = evt => {
    if(evt.key === 'Enter') {
      fetch(`${base}weather?q=${this.state.query}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(result => {
          this.setWether(result);
          
        })
    }
  }

  // Рендер даты
  renderItems = (data) => {
    if(typeof data.main != 'undefined') {
      return(
        <div className="help__block">
          <div className="card">
            <div className="card__name">{data.name},{data.sys.country}</div>
            <div className="card__date">{this.dataBuilder(new Date())}</div>
            <div className="temp__block">
              <div className="card__temp">{Math.round(data.main.temp)}°C</div>
            </div>
            
            <div className="descr__block">
              <div className="card__descr">{data.weather[0].description}</div>
            </div>
            
          </div>
        </div>
      )
    }
    else
      
      return ''

  }


 render() {
  
  const {weathers, query} = this.state;
  const content = this.renderItems(weathers);
  return(
    
    <div>
      <NavBar/>
      <div className="container">
        <Search
        valueInp={query}
        searchItem={this.search}
        setQuery_1 = {this.setQuery}/>
        {content}
      </div>
      
    </div>
  )
 }
  
}



export default App;
