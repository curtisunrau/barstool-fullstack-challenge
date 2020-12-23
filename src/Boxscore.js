import React from 'react';

import './Boxscore.css';

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
        <div className='scoreTicker'>

          <div className='TeamName'>

            <div className='ScoreSectionNumber'>
              {this.returnTime()}
            </div>

            <div className='TeamLabel'>
              <p className='TeamPaddingText'>{this.state.game.away_team.full_name}</p>
            </div>
            <div className='TeamLabel'>
              <p className='TeamPaddingText'>{this.state.game.home_team.full_name}</p>
            </div>

          </div>

          {this.returnScoreSection(1)}
          {this.returnScoreSection(2)}
          {this.returnScoreSection(3)}
          {this.returnScoreSection(4)}
          {this.returnScoreSectionFinal()}
          {this.returnTopScorers()}




        </div>
      )



    }


    returnScoreSection = (quarter) =>{

        return(
          <div className='QuarterSection'>
            
            <div className='ScoreSectionNumber'>
              <p className="numberHeaderText">{quarter}</p>
            </div>

            <div className='ScoreSection'>
              <p>{this.state.game.away_period_scores[quarter - 1]}</p>
            </div>

            <div className='ScoreSection'>
             <p>{this.state.game.home_period_scores[quarter - 1]}</p>
            </div>
            
            
            

          </div>
        )



    }

    returnScoreSectionFinal = () =>{

      return(
        <div className='QuarterSection'>
          
          <div className='ScoreSectionNumber'>
            <p className="numberHeaderText">Total</p>
          </div>

          <div className='ScoreSection'>
            <p>{this.state.game.away_totals.points}</p>
          </div>

          <div className='ScoreSection'>
           <p>{this.state.game.home_totals.points}</p>
          </div>
          
          
          

        </div>
      )



  }

  returnTopScorers = () =>{

    return(
      <div className='TopScorerSection'>
        
        <div className='ScoreSectionNumber'>
          <p className="numberHeaderText">Top Scorer</p>
        </div>

        <div className='ScoreSection'>
          {this.returnTopScorer('away')}
        </div>

        <div className='ScoreSection'>
        {this.returnTopScorer('home')}
        </div>
        
        
        

      </div>
    )
  }

  returnTopScorer = (hORa) =>{

    var topScorer = {points: 0};

    if(hORa === 'away'){
      var data = this.state.game.away_stats;
    }else{
      var data = this.state.game.home_stats;
    }


    for(var i = 0; i < data.length; i++){

      if(data[i].points > topScorer.points){
        topScorer = data[i];
      }
    }



    return(
      <p>{topScorer.display_name + ': (' + topScorer.points + ' PTS, ' + (topScorer.offensive_rebounds + topScorer.defensive_rebounds) + ' REBS, '  + topScorer.assists + ' AST) ' }</p>
    );


  }

  returnTime = () =>{

    if(this.state.game.event_information.status == 'completed'){
      return(<p className="HeaderText">FINAL</p>);
    }else{
      return(<p className="HeaderText">{this.state.game.event_information.gameTime}</p>);
    }
  }


  

 







  




  



    

  

  render(){
      
      return (

          <div className='container'>

            {this.returnScore()}

            
            
            
           
          </div>
        );
  }

}

export default Boxscore;
