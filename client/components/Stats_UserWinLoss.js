import React from 'react';
import _ from 'underscore';
import ReactD3 from 'react-d3-components';
import * as db from '../models/menu';
import UserMoves from './Stats_UserMoves';

export default class ScoresChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fbName:'',
      userScores: [], // [{wins:4},{losses:2}]
      wins: 0,
      losses: 0,
      pieChartValues: [{x: 'wins', y: 0}, {x: 'losses', y: 0}]
    }
  }

  componentDidMount() {
    var fbName = sessionStorage.getItem('fbUser');
    if (fbName.length > 0){
      this.getPlayer(fbName);
      this.setState({fbName});
    }
  }

  getPlayer(player) {
    db.playerList()
      .then(players => {
        console.log('1~~~~', players, this.state.fbName)
          const targetPlayer = players.filter(player => player.name === this.state.fbName)[0]
          console.log('2~~~player is ~~~~',targetPlayer)
            this.updateUserScoresState(targetPlayer);
        })
  }


  updateUserScoresState(user) {

      this.setState({wins: user.wins});
      this.setState({losses: user.losses});
      console.log('3~~~~',this.state.wins)
      console.log('4~~~~',this.state.losses)
     
      this.generateLeaderBoard();

  }

  generateLeaderBoard() {
    // const values = this.state.userScores.map(userScore => {
    //   const key = Object.keys(userScore)[0];
    //   return {x: key, y: userScore[key]}
    // })

    this.setState({pieChartValues: [{x: 'wins', y: this.state.wins}, {x: 'losses', y: this.state.losses}]})
  }
  //[{x: 'wins', y: 0}, {x: 'losses', y: 0}]

  tooltipPieChart(x,y) {
    //console.log(x,y)
    return y.toString();
  }

  render() {

    const PieChart = ReactD3.PieChart;
    const data = {
        label: 'Your Stats',
        values: this.state.pieChartValues
    };

    return (
        <div className="col-xs-12 text-center">
          <br/>
          <br/>
          {sessionStorage.getItem('fbUser') 
            ?
              <div>
              <h2> Stats for {this.state.fbName}: </h2>
              <hr/>
              {(!this.state.losses)? <h4> No Losses so far!</h4>: null}
              {(!this.state.wins)? <h4> No Wins so far...</h4>: null}
              {(this.state.wins) || (this.state.losses)
                ? <div>
                  <PieChart
                         data={data}
                         width={600}
                         height={400}
                         margin={{top: 30, bottom: 10, left: 100, right: 100}}                
                         tooltipHtml={this.tooltipPieChart}
                         tooltipMode={'fixed'}
                         tooltipOffset={{top: 135, left: 200}}
                       />

                   <UserMoves />
                  </div>
                  
                : <h4> You haven't played any games yet. </h4>
              }
              </div>
            : <h2>Please log in to see your stats.</h2>
          }
        </div>

    )
  }
}
