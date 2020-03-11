import React from 'react'
import {Component} from 'react'
import { Tab,Grid,Header,Image } from 'semantic-ui-react'
import PrivateKeyTab from './privateKey'
import MnemonicTab from './mnemonicTab'
import  KeyStoreTab from './keystoreTab'
const panes = [
    { menuItem: '私钥', render: () => <Tab.Pane><PrivateKeyTab /></Tab.Pane> },
    { menuItem: '助记词', render: () => <Tab.Pane><MnemonicTab /></Tab.Pane> },
    { menuItem: 'KeyStore', render: () => <Tab.Pane><KeyStoreTab /></Tab.Pane> },
];


class LoginTab extends Component {
    componentWillMount(){

    }
    render(){
        return(
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450, marginTop: 100 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        <Image src="images/logo.png" /> 东神社区钱包
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