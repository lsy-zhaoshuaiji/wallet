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
