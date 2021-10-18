import React from 'react';
import './App.css';
//import Item from './myItem';

class FilmItemRow extends React.Component {
    render() {
        return (
            <li>{this.props.url}</li>
        )
    }
}

class StarWars extends React.Component {
    constructor() {
        super()
        this.state = {
            loadedChar: false,
            name: null,
            height: null,
            homeworld: null,
            affiliations: [],
        }
    }
    getNewChar() {
        //console.log("Get new character");
        const rand = Math.ceil(Math.random()*87);
        const url = `https://akabab.github.io/starwars-api/api/id/${rand}.json`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.image)
                this.setState({
                    loadedChar: true,
                    name: data.name,
                    height: data.height,
                    homeworld: data.homeworld,
                    affiliations: data.affiliations,
                    image: data.image,
                })
            })
    }
    render() {
        const affil = this.state.affiliations.map((url, i) => {
            return <FilmItemRow key={i} url={url} />
        })
        
        return (
            <div className="center">
                <button type="button" onClick={() => this.getNewChar()} class="btn">Randomize Character</button>
            {
                this.state.loadedChar &&
                <div>
                    <img src={this.state.image} className="pulledImage" />
                    <h1 className="name">{this.state.name}</h1>
                    <p className="height">Height: {this.state.height}m</p>
                    <p className="hw">Homeworld: {this.state.homeworld}</p>
                    {affil}
                </div>
            }
                
            </div>
        )
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;