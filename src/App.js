import React from 'react';
import axios from 'axios';
import './App.css';

const getURL = year => `https://nolaborables.com.ar/api/v2/feriados/${year}`
  
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  
const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  
const dayOfWeek = (day, month, year) => days[new Date(year, month, day).getDay()]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      year: (new Date()).getFullYear()
    }
  }

  setNext(holidays) {
    const now = new Date()
    const today = {
      day: now.getDate(),
      month: now.getMonth() + 1
    };

    let holiday = holidays.find(h => 
      (h.mes === today.month && h.dia > today.day) || h.mes > today.month
    );

    if (!holiday){
      holiday = holidays[0];
    }
    
    this.setState({
      loading: false,
      holiday
    })
  }
  
  componentDidMount () {
    axios.get(getURL(this.state.year)).then(({data}) => this.setNext(data))

    this.timeoutId = setTimeout(function () {
        var card_body = document.querySelector(".card_body");
        card_body.classList.add("active");
    }, 800);
  } 

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
  }

  render () {
    const {loading, holiday, year} = this.state
    return (
      <div className="wrapper-bk">
        
        <div className="gradient-blur uno">
            <svg width="100vw" height="100vh" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg">
                <path fill="#545775" d="M33.3,-43.4C44.7,-30.2,56.6,-21.1,59.7,-9.6C62.9,2,57.4,16,51.3,32.5C45.2,49,38.4,68,25.3,75.2C12.3,82.3,-7.2,77.6,-20.2,67.6C-33.3,57.6,-40,42.3,-50.9,27.4C-61.9,12.6,-77,-1.8,-79,-18C-80.9,-34.1,-69.7,-51.9,-54.4,-64.4C-39,-76.9,-19.5,-84.1,-4.3,-79C11,-73.9,21.9,-56.6,33.3,-43.4Z" transform="translate(100 100)" />
                <filter id="svgfilter">
                    <feGaussianBlur stdDeviation="80"/>
                </filter>
            </svg>
        </div>
        <div className="gradient-blur dos">
            <svg width="100vw" height="100vh" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <path fill="#6BAA75" d="M14.9,-18.4C23.8,-14,38.6,-15.7,48.8,-9.8C59,-3.9,64.7,9.4,57.9,15.3C51.1,21.1,31.9,19.3,20.2,24.2C8.5,29.2,4.2,40.9,-2.6,44.4C-9.3,47.9,-18.7,43.3,-33.2,39.2C-47.7,35.1,-67.3,31.7,-63.5,25C-59.8,18.2,-32.6,8.2,-18.7,2.7C-4.9,-2.9,-4.3,-4,-3.4,-10.9C-2.5,-17.9,-1.2,-30.6,0.9,-31.8C3,-33,6,-22.7,14.9,-18.4Z" transform="translate(100 100)" />
                <filter id="svgfilter">
                    <feGaussianBlur stdDeviation="80"/>
                </filter>
            </svg>
        </div>
        <div className="card_wrap">
        {loading ? <h1 className="loading">Buscando ...</h1> :
            <div className="card_body">
              <div className="card_body-gradient"></div>
              <div className="description">
                  <h4>EN</h4>
                  <h1>13</h1>
                  <h2>DIAS</h2>
              </div>
              <div className="footer">
                  <h3><b>{dayOfWeek(
              holiday.dia, holiday.mes-1, year)}</b> {holiday.dia} DE {months[holiday.mes-1]}</h3>
                  <h4><b>{this.state.holiday.motivo}</b></h4>
              </div>
            </div>
            }
        </div>
        <div className="made-by">
            Made by <a href="http://pluscollective.io/">Plus Collective</a> 
        </div>

        
      </div>
    )
  }

}

export default App;
