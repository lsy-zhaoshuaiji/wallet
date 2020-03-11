import React from 'react'
import {Component} from 'react'
import TransactionTab from './transactionTab'
import AccountTab from './accountTab'
import { Dropdown } from 'semantic-ui-react'
import services from './service/service'
import  SettingTab from './settingTab'
let ethers=require('ethers');
class Wallet extends Component {
    constructor(props){
        super();
        this.state=({
            wallets:props.wallets,
            walletSelected:0,
            address:'',
            balance:'',
            txCount:'',
            walletActive: '',
        })
    }
    componentDidMount(){
        this.UpdateCurrentWallet(this.state.walletSelected);
        console.log(this.state.wallets,"wwwwwwwwwwwww")
    };
    async UpdateCurrentWallet(index){
        let wallet=this.state.wallets[index];
        let provider=new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
        let walletActive=wallet.connect(provider);
        let address=await walletActive.getAddress();
        let balance=await walletActive.getBalance();
        let txCount=await walletActive.getTransactionCount();
        console.log("address is : ",address);
        console.log("balance is : ",ethers.utils.formatEther(balance));
        console.log("txCount is : ",txCount);
        this.setState({
            address,
            balance,
            txCount,
            walletActive,
        })

    };
    onSendClick = async (txto, txvalue) => {
        console.log("txto: ", txto);
        console.log("txvalue: ", txvalue);

        //txto是否为有效地址
        if (!services.checkAddress(txto)) {
            alert("转账地址无效!");
            return
        }

        //txvalue是否为数字
        if (isNaN(txvalue)) {
            alert("转账数字无效!");
            return
        }

        //转账逻辑
        let walletActive = this.state.walletActive; //得到激活的钱包

        //这个转换动作必须做，否则不满足转账数据类型, 会出错
        txvalue = ethers.utils.parseEther(txvalue);
        console.log("txvalue222 : ", txvalue);

        try {
            let res = await walletActive.sendTransaction({
                to: txto,
                value: txvalue
            });
            console.log("转账返回结果详细信息 :", res);
            alert("转账成功!");

            //更新展示页面
            this.UpdateCurrentWallet(this.state.walletSelected);
        } catch (error) {
            alert("转账失败!");
            console.log(error);
        }
    };
    selectValue(event,data){
        this.setState({walletSelected:data.value});
        this.UpdateCurrentWallet(data.value)
    }
    render(){
        let valueList=[];
        this.state.wallets.map((item,index)=>{
            let tmp={key:index,text:item.address,value:index};
            valueList.push(tmp);
        });
        console.log("sdfdsfssssssssssssssssssssssssss",valueList);

        return(
            <div>
                <Dropdown
                    placeholder='Select Friend'
                    fluid
                    selection
                    options={valueList}
                    onChange={this.selectValue.bind(this)}
                />
                <AccountTab allinfo={this.state}/>,
                <TransactionTab onSendClick={this.onSendClick} />
                {
                    this.state.walletActive && <SettingTab walletActive={this.state.walletActive} />
                }
            </div>
        )
    }
}
export default Wallet