import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import  services from '../../src/view/service/service'
import Pubsub from 'pubsub-js'
class PrivateKeyTab extends Component {
    state={
      privateKey:'',
      address:'',
      wallets: [],
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

        //单个钱包
        let WalletObj=services.CreateWalletByPrivateKey(privateKey);
        let wallets=[];
        wallets.push(WalletObj);
        this.setState({
            wallets,
        });
        Pubsub.publish('OnLoginSuccessfully',wallets);
        console.log("111 : ", this.state.wallets);
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
