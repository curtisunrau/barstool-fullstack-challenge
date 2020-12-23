import React from 'react';

import './NBA.css';
import Boxscore from './Boxscore.js'
import MLBBoxscore from './MLBBoxscore.js'

const fetch = require("node-fetch");



class NBA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          NBA: null,
          MLB: null,
        }

        this.gameData = this.gameData.bind(this)
      }

    componentDidMount(){
      
      this.gameData()
    }

    gameData = async function() {
      
        try {
          const resp = await fetch('http://localhost:8080/NBA');
          const data = await resp.json();

          const resp1 = await fetch('http://localhost:8080/MLB');
          const data1 = await resp1.json();
          
          //var processedData = JSON.parse(data[0].name)
          this.setState({NBA: data[0],MLB: data1[0]})
        } catch (err) {
          console.log(err)
        }
      }


      returnGameData = () =>{
        
        if(this.state.NBA !== null){
          
          return(
            <div>
              <Boxscore game={this.state.NBA}/>
              <MLBBoxscore game={this.state.MLB}/>
            </div>
          );
        }
      }


    

    render(){
        
        return (

            <div>
                
              {this.returnGameData()}
                
        
        
            </div>
          );
    }
  
}

export default NBA;
