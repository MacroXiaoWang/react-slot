import React, {Component} from "react";
import {Form, Icon, Input, Button, Checkbox, Layout} from 'antd';
import style from "./index.css"

const FormItem = Form.Item;

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            iconLoading: false,
        }
    }

    enterIconLoading = () => {
        this.setState({iconLoading: true});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout className={style["layout-login-container"]}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <div className={style['login-logo']}>
                        ADMIN SYSTEMs
                    </div>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                                loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                            Login In!
                        </Button>
                        现在就去<a href="">注册</a>
                    </FormItem>
                </Form>
            </Layout>
        );
    }

}

const LoginForm = Form.create()(Index);

export default LoginForm;