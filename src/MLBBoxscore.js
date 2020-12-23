import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import logo from './barstoolLogo.png';
import './MLBBoxscore.css';

class Boxscore extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        game: JSON.parse(this.props.game.name),
        currentTab: 'away',
      }

      
    }

    

    returnScore = (score) =>{

      return(
        


        <div className='BaseballscoreTicker'>

          <div className='BaseballTeamName'>

            <div className='ScoreSectionNumber'>
              {this.returnTime()}
            </div>

            <div className='BaseballTeamLabel'>
              <p className='TeamPaddingText'>{this.state.game.away_team.full_name}</p>
            </div>
            <div className='BaseballTeamLabel'>
              <p className='TeamPaddingText'>{this.state.game.home_team.full_name}</p>
            </div>

          </div>

          {this.returnScoreSection(1)}
          {this.returnScoreSection(2)}
          {this.returnScoreSection(3)}
          {this.returnScoreSection(4)}
          {this.returnScoreSection(5)}
          {this.returnScoreSection(6)}
          {this.returnScoreSection(7)}
          {this.returnScoreSection(8)}
          {this.returnScoreSection(9)}
          {this.returnScoreSectionFinal('R')}
          {this.returnScoreSectionFinal('H')}
          {this.returnScoreSectionFinal('E')}




        </div>

        

        

      )



    }


    returnScoreSection = (quarter) =>{

        return(
          <div className='BaseballQuarterSection'>
            
            <div className='BaseballScoreSectionNumber'>
              <p  className='numberHeaderText'>{quarter}</p>
            </div>

            <div className='BaseballScoreSection'>
              <p>{this.state.game.away_period_scores[quarter - 1]}</p>
            </div>

            <div className='BaseballScoreSection'>
             <p>{this.state.game.home_period_scores[quarter - 1]}</p>
            </div>
            
            
            

          </div>
        )



    }

    returnScoreSectionFinal = (type) =>{

      var away = null;
      var home = null;

      if(type === 'R'){
        home = this.state.game.home_batter_totals.runs;
        away = this.state.game.away_batter_totals.runs;
      }else if(type === 'H'){
        home = this.state.game.home_batter_totals.hits;
        away = this.state.game.away_batter_totals.hits;
      }else if(type === 'E'){
        home = this.state.game.home_errors;
        away = this.state.game.away_errors;
      }

      return(
        <div className='BaseballQuarterSection'>
          
          <div className='BaseballScoreSectionNumber'>
            <p className='numberHeaderText'> {type}</p>
          </div>

          <div className='BaseballScoreSection'>
            <p>{away}</p>
          </div>

          <div className='BaseballScoreSection'>
           <p>{home}</p>
          </div>
          
          
          

        </div>
      )



  }

  returnTime = () =>{

    if(this.state.game.event_information.status == 'completed'){
      return(<p className='HeaderText'>FINAL</p>);
    }else{
      return(<p className='HeaderText'>{this.state.game.event_information.gameTime}</p>);
    }
  }



  returnExtraDetails = () =>{

    if(this.state.game.event_information.status === 'completed'){


      
      return(
          <p>{'  Winning Pitcher: '}</p>
      );
    }else if(this.state.game.event_information.status === 'pre-game'){

    }else if(this.state.game.event_information.status === 'in-game'){

    }


  }


  returnStats = () =>{

      return(
        <div className='StatsContainer'>

          <div className="TeamStatsLabel">   

            <div className="TeamNameStats" onClick={() => this.changeTab('away')}>
              {this.returnTeamName('away')}
            </div>

            <div className="TeamNameStats" onClick={() => this.changeTab('home')}>
            {this.returnTeamName('home')}
            </div>
          
          </div>

          {this.returnTeamStats()}

        </div>



      );







  }

  returnTeamName = (hORa) =>{

    if(this.state.currentTab == 'away'){
      if(hORa == 'away'){
        return(<h2 className='TeamNameTextBold'>{this.state.game.away_team.full_name}</h2>);
      }else{
        return(<h2 className='TeamNameText'>{this.state.game.home_team.full_name}</h2>);
      }
    }else{
      if(hORa == 'home'){
        return(<h2 className='TeamNameTextBold'>{this.state.game.home_team.full_name}</h2>);
      }else{
        return(<h2 className='TeamNameText'>{this.state.game.away_team.full_name}</h2>);
      }
    }


  }

  returnTeamStats = () =>{

    if(this.state.currentTab == 'away'){
      var stats = this.state.game.away_batters;
    }else{
      var stats = this.state.game.home_batters;
    }

    return(
      <div className='TeamPlayerStatsContainer'>

        <div className='PlayerStatLine'>

        <div className="PlayerName">
          <p>Name</p>
        </div>

        <div className="StatSection">
          <p>AB</p>
        </div>

        <div className="StatSection">
          <p>R</p>
        </div>

        <div className="StatSection">
          <p>H</p>
        </div>

        <div className="StatSection">
          <p>RBI</p>
        </div>

        <div className="StatSection">
          <p>HR</p>
        </div>

        <div className="StatSection">
        <p>K</p>
        </div>

        <div className="StatSection">
          <p>BB</p>
        </div>

        <div className="StatSection">
          <p>SB</p>
        </div>

        <div className="StatSection">
          <p>CS</p>
        </div>

        <div className="StatSection">
          <p>LOB</p>
        </div>

        <div className="StatSection">
          <p>TB</p>
        </div>

        <div className="StatSection">
          <p>AVG</p>
        </div>

        <div className="StatSection">
          <p>OBP</p>
        </div>

        <div className="StatSection">
          <p>SLG</p>
        </div>






        </div>

          {stats.map((player) => (
            this.returnPlayerStats(player)
          ))}

        

      </div>
    )



  }

  returnPlayerStats = (player) =>{
    
    return(
      <div className='PlayerStatLine'>

        <div className="PlayerName">
          <p>{player.display_name}</p>
        </div>

        <div className="StatSection">
          <p>{player.at_bats}</p>
        </div>

        <div className="StatSection">
          <p>{player.runs}</p>
        </div>

        <div className="StatSection">
          <p>{player.hits}</p>
        </div>

        <div className="StatSection">
          <p>{player.rbi}</p>
        </div>

        <div className="StatSection">
          <p>{player.home_runs}</p>
        </div>

        <div className="StatSection">
        <p>{player.strike_outs}</p>
        </div>

        <div className="StatSection">
          <p>{player.walks}</p>
        </div>

        <div className="StatSection">
          <p>{player.stolen_bases}</p>
        </div>

        <div className="StatSection">
          <p>{player.caught_stealing}</p>
        </div>

        <div className="StatSection">
          <p>{player.left_on_base}</p>
        </div>

        <div className="StatSection">
          <p>{player.total_bases}</p>
        </div>

        <div className="StatSection">
          <p>{player.avg}</p>
        </div>

        <div className="StatSection">
          <p>{player.obp}</p>
        </div>

        <div className="StatSection">
          <p>{player.slg}</p>
        </div>

       
        
        


      </div>

    )





  }


  changeTab = (tab) =>{

    this.setState({currentTab: tab});

  }





  




  



    

  

  render(){
      
      return (

          <div className='Baseballcontainer'>

            {this.returnScore()}
            

           
          </div>
        );
  }

}
//

export default Boxscore;
