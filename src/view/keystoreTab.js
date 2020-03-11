import React, { Component } from "react";
import {
    Dimmer,
    Segment,
    Progress,
    Loader,
    Form,
    Button
} from "semantic-ui-react";
import service from "./service/service";
import PubSub from "pubsub-js"

class KeyStoreTab extends Component {
    state = {
        loading: false,
        progress: "",

        keyStore: "", //json数据
        pwd: "", //密码
        wallets:[],
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
        console.log(name, value);
    };

    //根据json数据和密码生成对应的钱包
    handleKeystoreImport = async () => {
        let { keyStore, pwd } = this.state;

        try {
            this.setState({loading : true});
            let wallet = await service.createWalletFromKeyStore(keyStore, pwd, (progress) => {
                this.setState({progress})
            });
            let wallets=[];
            wallets.push(wallet);
            this.setState({wallets,});
            //发布login成功的事件,
            //事件名字
            //传递的数据
            PubSub.publish("OnLoginSuccessfully", wallets); //事件名字，事件传递数据
            console.log(this.state.wallets);
            this.setState({loading : false})
        } catch (error) {
            alert(error)
            this.setState({loading : false})
        }
    };

    render() {
        return (
            <Dimmer.Dimmable as={Segment} dimmed={this.state.loading}>
                {this.state.progress && (
                    <Progress
                        style={{
                            width: "100%"
                        }}
                        percent={parseInt(this.state.progress * 100)}
                        inverted
                        success
                        progress
                    />
                )}
                <Dimmer active={this.state.loading} inverted>
                    <Loader active={this.state.loading} inline />
                </Dimmer>
                <Form size="large">
                    <Segment>
                        <Form.TextArea
                            placeholder="keystore为json格式"
                            name="keyStore"
                            value={this.state.keyStore}
                            onChange={this.handleChange}
                        />

                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            name="pwd"
                            value={this.state.pwd}
                            onChange={this.handleChange}
                        />
                        <Button
                            color="teal"
                            fluid
                            size="large"
                            onClick={this.handleKeystoreImport}
                        >
                            导入(下一步)
                        </Button>
                    </Segment>
                </Form>
            </Dimmer.Dimmable>
        );
    }
}

export default KeyStoreTab;
