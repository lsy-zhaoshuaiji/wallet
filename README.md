···教程地址：https://blog.csdn.net/Laughing_G/article/details/104715173
一、意义：
           在区块链世界中，虚拟货币一般存放在三个地方（矿机用户端、钱包、交易所）。矿机端转账繁琐，没有UI界面，对于无运维基础的用户来说具有很大的上手难度。交易端无法直接获取矿机端的收益，且有项目方跑路的危险性。为了解决以上问题，亟需一款既有安全性又能简单完成转账的软件。此时“钱包”横空出世，以区块链世界运输者的身份完善了区块链世界。

          钱包的作用也很直观，两个功能：1.存放钱。2.交易（转账，把钱付出去，收进来）。下面我们来刨根挖底、一步一步开发一款自己的钱包。

二、虚拟货币钱包技术剖析
1.HD钱包BIP44
相信各位小伙伴，在平时生活中都使用或听说过区块链钱包。那么各位对于助记词一定不会陌生，一个简单的助记词是如何创建和管理多币种的地址呢？答案就在HD钱包里。

HD 钱包是目前常用的确定性钱包 ，HD 是 Hierarchical Deterministic（分层确定性）的缩写。所谓分层，就是一个大公司可以为每个子部门分别生成不同的私钥，子部门还可以再管理子子部门的私钥，每个部门可以看到所有子部门里的币，也可以花这里面的币。也可以只给会计人员某个层级的公钥，让他可以看见这个部门及子部门的收支记录，但不能花里面的钱，使得财务管理更方便了。这个过程就是基于BIP44来实现的，具体实现的方法就不深究了，各位有一个概念即可。

2.Ethers.js
Ethers.js则是一个轻量级的web3.js替代品。具有Web3的全部功能。且Ethers.js具有创建钱包等相关功能，所以我们在此节将使用Ethers.js与合约交互。官方文档：https://learnblockchain.cn/docs/ethers.js/

安装:

npm install --save ethers

5种生产钱包的方法：

为了快速测试，这里我们默认连接ganache-cli(8545)

let ethers=require('ethers');
//1.通过私钥创建钱包
let privateKey='0xec3702c3c89d352b95e0e0288fab1ca16c55977963804748e215cb9415c72b58';
let w1=new ethers.Wallet(privateKey);
console.log(w1.privateKey);
console.log(w1.address);
//2.随机创建一个新的钱包
let w2=new ethers.Wallet.createRandom();
console.log(w2.privateKey);
console.log(w2.address);
console.log(w2.mnemonic);
//3.给定json文件，创建钱包
let data = {
    id: "fb1280c0-d646-4e40-9550-7026b1be504a",
    address: "88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
    Crypto: {
        kdfparams: {
            dklen: 32,
            p: 1,
            salt: "bbfa53547e3e3bfcc9786a2cbef8504a5031d82734ecef02153e29daeed658fd",
            r: 8,
            n: 262144
        },
        kdf: "scrypt",
        ciphertext: "10adcc8bcaf49474c6710460e0dc974331f71ee4c7baa7314b4a23d25fd6c406",
        mac: "1cf53b5ae8d75f8c037b453e7c3c61b010225d916768a6b145adf5cf9cb3a703",
        cipher: "aes-128-ctr",
        cipherparams: {
            iv: "1dcdf13e49cea706994ed38804f6d171"
        }
    },
    "version" : 3
};

let json = JSON.stringify(data);
let password = "foo";

ethers.Wallet.fromEncryptedJson(json, password).then(function(wallet) {
    console.log("Json Address: " + wallet.address);
    // "Address: 0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290"
});
//4.给定助记词，生成钱包
let mnemonic = "pepper gift color reward collect timber pyramid rhythm avoid head city want";
let path = "m/44'/60'/0'/0/0";    //格式为: m/44'/60'/0'/0/{account_index}
let secondMnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic, path);
console.log("secondMnemonicWallet Address: " + secondMnemonicWallet.address);
//5.随机创建一个助记词钱包
let randValue=ethers.utils.randomBytes(16);
let w5_mnemonic=ethers.utils.HDNode.entropyToMnemonic(randValue);
console.log(`mnemonic: ${w5_mnemonic}`);
let path1 = "m/44'/60'/0'/0/0";
let thirdMnemonicWallet = ethers.Wallet.fromMnemonic(w5_mnemonic, path1);
console.log("thirdMnemonicWallet:",thirdMnemonicWallet.address);

处理加密的 JSON 钱包文件

加密钱包输出 JSON wallet

let password = "password123";

function callback(progress) {
    console.log("Encrypting: " + parseInt(progress * 100) + "% complete");
}

let encryptPromise = wallet.encrypt(password, callback);

encryptPromise.then(function(json) {
    console.log(json);
});

3.React
一款前端框架，由于官方推出了Truffle-react框架，所以促进了大部分区块链项目使用react开发。目前React和Vue拥有着区块链项目很大的市场占有率。

4.Pubsub.js消息的发布订阅
在前端框架中，无论是vue还是react。组件传递数据一般会使用props。props是一层一层传递数据的，且兄弟组件传递需要借助父组件，比较麻烦。所以当传递的层数比较多时，可以用此工具库。

安装：

npm install pubsub-js --save

 使用：

// 导入
import PubSub from "pubsub-js"

// 在有数据的地方进行发布
class Data extends React.Component{
  pubmsg = ()=>{
      PubSub.publish("频道","频道发布的消息")
  }
  render() {
      return(
          <button onClick={this.pubmsg}>Data组件,发布消息</button>
          )
      }
  }
  
  // 订阅
  class App extends Component {
    // 组件将要被渲染的时候进行订阅
    componentWillMount() {
      PubSub.subscribe("频道", (msg,data)=> {
        console.log(msg,data)
      })
    }
  
    render() {
      return (
        <div className="App">
           <Data />
        </div>
      );
    }
  }

5.FileSaver.js
如果你需要保存较大的文件，不受 blob 的大小限制或内存限制，可以看一下更高级的 StreamSaver.js，
它使用强大的 stream API，可以将数据直接异步地保存到硬盘。支持进度、取消操作以及完成事件回调。

npm install file-saver --save

 保存文字/json：

var FileSaver = require('file-saver');
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");

 你可以保存一个文件结构，不需要指定文件名。文件自身已经包含了文件名，有一些方法来获取文件实例（从 storage，file input，新的构造函数）
如果你想修改文件名，你可以在第二个参数设置文件名。

var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
saveAs(file);
三、项目实现
1.准备工作
create-react-app Wallet-eth
npm install --save ethers

2.私钥创建钱包代码实现 
2.1在src下创建login.js，负责创建钱包的基础前端页面

import React from 'react'
import {Component} from 'react'
import { Tab,Grid,Header,Image } from 'semantic-ui-react'

const panes = [
    { menuItem: '私钥', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: '助记词', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'KeyStore', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];
class LoginTab extends Component {
    componentWillMount(){

    }
    render(){
        return(
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450, marginTop: 100 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        <Image src="images/logo.png" /> ETH钱包
                    </Header>
                    <Tab
                        menu={{ text: true }}
                        panes={panes}
                        style={{ maxWidth: 450 }}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}

export default LoginTab

2.2创建privateKey.js，完善私钥创建钱包的前端页面

代码如下：总结：1.<Form>嵌套<Segment>会在视觉上让层次感更明显 2.<br />标签可以很好的控制两个块级元素保持距离

import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import  services from '../../src/view/service/service'
class PrivateKeyTab extends Component {
    state={
      privateKey:'',
      address:'',
      wallet: {}
    };
    CreateRanderHandler=()=>{
        let WalletObj=services.CreateRanderWallet();
        this.setState({
            privateKey:WalletObj.privateKey,
        });
    };
    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
        console.log("name :", name);
        console.log("value :", value);
    };
    onPrivateLoginClick = () => {
        //获取私钥（自动生成，用户输入）
        let privateKey = this.state.privateKey;
        let checkResult=services.checkPrivateKey(privateKey);
        if (checkResult){
             alert(checkResult);
             return
        }
        let WalletObj=services.CreateWalletByPrivateKey(privateKey);
        this.setState({
            wallet:WalletObj,
        });
        console.log("111 : ", this.state.wallet);
    };

    render() {
        return (
            <Form size="large">
                <Segment>
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="private key"
                        name="privateKey"
                        value={this.state.privateKey}
                        onChange={this.handleChange}
                    />{" "}
                    <Button onClick={this.CreateRanderHandler}> 随机生成 </Button>{" "}
                    <br />
                    <br />
                    <Button
                        color="teal"
                        fluid
                        size="large"
                        onClick={this.onPrivateLoginClick}
                    >
                        私钥导入(下一步){" "}
                    </Button>{" "}
                </Segment>{" "}
            </Form>
        );
    }
}

export default PrivateKeyTab;
2.3完善privateKey.js，与ehters交互创建钱包，并利用Pubsub传递钱包对象，在APP.js中接收（省略...）

import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import  services from '../../src/view/service/service'
import Pubsub from 'pubsub-js'
class PrivateKeyTab extends Component {
    state={
      privateKey:'',
      address:'',
      wallet: {}
    };
    CreateRanderHandler=()=>{
        let WalletObj=services.CreateRanderWallet();
        this.setState({
            privateKey:WalletObj.privateKey,
        });
    };
    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
        console.log("name :", name);
        console.log("value :", value);
    };
    onPrivateLoginClick = () => {
        //获取私钥（自动生成，用户输入）
        let privateKey = this.state.privateKey;
        let checkResult=services.checkPrivateKey(privateKey);
        if (checkResult){
             alert(checkResult);
             return
        }
        let WalletObj=services.CreateWalletByPrivateKey(privateKey);
        this.setState({
            wallet:WalletObj,
        });
        Pubsub.publish('OnLoginSuccessfully',WalletObj);
        console.log("111 : ", this.state.wallet);
    };

    render() {
        return (
            <Form size="large">
                <Segment>
                    <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="private key"
                        name="privateKey"
                        value={this.state.privateKey}
                        onChange={this.handleChange}
                    />{" "}
                    <Button onClick={this.CreateRanderHandler}> 随机生成 </Button>{" "}
                    <br />
                    <br />
                    <Button
                        color="teal"
                        fluid
                        size="large"
                        onClick={this.onPrivateLoginClick}
                    >
                        私钥导入(下一步){" "}
                    </Button>{" "}
                </Segment>{" "}
            </Form>
        );
    }
}

export default PrivateKeyTab;

2.4创建wallet.js，连接provider，与以太坊网络进行交互，得到钱包数据

import React from 'react'
import {Component} from 'react'
import AccountTab from './accountTab'
let ethers=require('ethers');
class Wallet extends Component {
    constructor(props){
        super();
        this.state=({
            wallet:props.wallet,
            address:'',
            balance:'',
            txCount:'',
        })
    }
    componentDidMount(){
        this.UpdateCurrentWallet()
    };
    async UpdateCurrentWallet(){
        let {wallet}=this.state;
        let provider=new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
        let walletNew=wallet.connect(provider);
        let address=await walletNew.getAddress();
        let balance=await walletNew.getBalance();
        let txCount=await walletNew.getTransactionCount();
        console.log("address is : ",address)
        console.log("balance is : ",ethers.utils.formatEther(balance))
        console.log("txCount is : ",txCount)
        this.setState({
            address,
            balance,
            txCount,
        })

    };
    render(){
        return(
            <AccountTab allinfo={this.state}/>
        )
    }
}
export default Wallet

2.5创建account.js，接收wallet.js传来的数据，显示钱包数据

import React from "react";
import { Header, Image, Segment, Form } from "semantic-ui-react";

let AccountTab = (props) => {
    let { address, balance, txCount } = props.allinfo;
    return (
        <div>
            <Header as="h2" color="teal" textAlign="center">
                <Image src="images/logo.png" /> ETH钱包
            </Header>
            <Segment stacked textAlign="left">
                <Header as="h1">Account</Header>
                <Form.Input
                    style={{ width: "100%" }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "address card",
                        content: "地址"
                    }}
                    actionPosition="left"
                    value={address}
                />
                <br />
                <Form.Input
                    style={{ width: "100%" }}
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "ethereum",
                        content: "余额"
                    }}
                    actionPosition="left"
                    value={balance}
                />
                <br />
                <Form.Input
                    actionPosition="left"
                    action={{
                        color: "teal",
                        labelPosition: "left",
                        icon: "numbered list",
                        content: "交易"
                    }}
                    style={{ width: "100%" }}
                    value={txCount}
                />
            </Segment>
        </div>
    );
};

export default AccountTab;

2.6转账功能实现

async UpdateCurrentWallet(){
        let {wallet}=this.state;
        let provider=new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
        let walletActive=wallet.connect(provider);
        let address=await walletActive.getAddress();
        let balance=await walletActive.getBalance();
        let txCount=await walletActive.getTransactionCount();
        console.log("address is : ",address)
        console.log("balance is : ",ethers.utils.formatEther(balance))
        console.log("txCount is : ",txCount)
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
            alert("转账数字无效!")
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
            this.UpdateCurrentWallet();
        } catch (error) {
            alert("转账失败!");
            console.log(error);
        }
    };

2.7检验地址等信息代码 services.js

let ethers=require('ethers');
let CreateRanderWallet=()=>{
    let w2=new ethers.Wallet.createRandom();
    return w2
};
let CreateWalletByPrivateKey=(PrivateKey)=>{
    console.log(PrivateKey,"wwwwwwwwwwwwwwwwwwwwwww");
    let w1=new ethers.Wallet(PrivateKey);
    return w1
};
let checkPrivateKey = (key) => {
    if (key === '') {
        return "不能为空!"
    }

    if (key.length != 66 && key.length != 64) {
        return "密钥长度为66位或64位16进制数字"
    }
    //^ : 开头
    //$ : 结尾
    //(0x)? : 可有可无
    //[0-9A-Fa-f]: 限定取值数据
    //{64}: 限定64个

    if (!key.match(/^(0x)?([0-9A-Fa-f]{64})$/)) {
        return "私钥为16进制表示,限定字符[0-9A-Fa-f]"
    }

    return ""
};
let checkAddress = (address) => {
    try {
        let addressNew = ethers.utils.getAddress(address);
        return addressNew
    } catch (error) {
        return ""
    }
}
let services={
    CreateRanderWallet,
    CreateWalletByPrivateKey,
    checkPrivateKey,
    checkAddress,
};


module.exports=services;

3.助记词生成钱包（略）
由于代码大致相同，这里就省略了，如有需要请在github上下载 。

4.KeyStore生成钱包（略）
由于代码大致相同，这里就省略了，如有需要请在github上下载 。Json文件可以在以太坊官方上注册一个，方便测试

官网地址：https://www.myetherwallet.com/

5.获取山寨币 
const ethers = require('ethers');


let abi = ....
let defaultProvider = ethers.getDefaultProvider('ropsten');


// 地址来自上面部署的合约
let contractAddress = "0x144ca56ad934413a985cd0b956621dd414cddd38";

// 使用Provider 连接合约，将只有对合约的可读权限
let contract = new ethers.Contract(contractAddress, abi, defaultProvider);

let currentValue =async ()=>{
    let res=await contract.balanceOf("0xc394628866a34f5Fc6355350700EE8c90dcD1b94");
    console.log(res.toString())
} ;
currentValue()

