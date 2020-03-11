import React from 'react';
import {Component}from 'react'
import './App.css';
import LoginTab from './view/login'
import Wallet from './view/wallet'
import Pubsub from 'pubsub-js'
import NiulianCoin from "./view/niulianCoin";
class App extends Component{
  constructor(){
    super();
    this.state={
        wallets:[],
        loginFlag:false,
    }
  }
  componentDidMount(){
      Pubsub.subscribe('OnLoginSuccessfully',(msg,data)=>{
          console.log('msg:',msg);
          console.log('data:',data);
          this.setState({
              wallets:data,
              loginFlag:true,
          })
      });

  }

    render() {
      let {wallets,loginFlag}=this.state;
      let content='';
      if (loginFlag){
          content=<Wallet wallets={wallets}/>
      }else {
          content=<LoginTab />
      }
        return (
            <div>
                {content}
                <NiulianCoin />
            </div>
        );
    }
}

export default App;
