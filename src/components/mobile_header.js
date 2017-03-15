/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {Icon, Menu, Dropdown, Modal, Tabs, Form, Button, Input, message} from 'antd'
import axios from 'axios'


import logo from '../images/logo.png'

class Mobile_Header extends Component {
    state = {
        visible: false,
        userId: null,
        userName: null
    }

    componentWillMount = () => {
        const userId = localStorage.userId
        const userName = localStorage.userName
        if(userId) {
            this.setState({userId, userName})
        }
    }

    handleLogout = () => {
        localStorage.userId = ''
        localStorage.userName = ''
        this.setState({
            userId: null,
            userName: null
        })
    }
    handleOk = () => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    }
    handleSubmit = (isRegister, event) => {
        event.preventDefault()
        const {userName, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        const action = isRegister? 'register':'login'
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${userName}&password=${password}&r_username=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        axios.get(url)
            .then(response => {
                const result = response.data
                if(isRegister) {
                    message.success('注册成功。')
                } else {
                    if(!result) {
                        message.warn("登录失败。")
                    } else {
                        message.success('登录成功。')
                        this.setState({
                            userId: result.UserId,
                            userName: result.NickUserName
                        })
                        localStorage.userId = result.UserId
                        localStorage.userName = result.NickUserName
                    }
                }
            })
        this.setState({
            visible: false
        })
    }


    render() {
        const userId = this.state.userId
        const userName = this.state.userName
        const {getFieldDecorator} = this.props.form
        const TabPane = Tabs.TabPane
        const FormItem = Form.Item
        const userMenu = (
            <Menu>
                <Menu.Item>
                    <span>{userName}</span>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/center'>
                        <span>个人中心</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/'><span  onClick={this.handleLogout}>退出账号</span></Link>
                </Menu.Item>
            </Menu>
        )
        const registerMenu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.showModal}>注册/登录</span>
                </Menu.Item>
            </Menu>
        )
        return (
            <div>
                <Link to='/'>
                    <div id="mobileheader" style={{padding: '0 10px'}}>
                        <header>
                            <img src={logo} alt="logo"/>
                            <Dropdown trigger={['click']} overlay={userId ? userMenu : registerMenu}>
                                <Icon className='register' style={{fontSize: '24px'}}
                                      type='user'/>
                            </Dropdown>
                        </header>
                    </div>
                </Link>
                <Modal title="用户中心" visible={this.state.visible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <Tabs onChange={() => this.props.form.resetFields()}>
                        <TabPane tab='登录' key="1">
                            <br/>
                            <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: '请输入用户名！'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Username" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码！'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="Password" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large">登录</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab='注册' key="2">
                            <br/>
                            <Form  onSubmit={this.handleSubmit.bind(this, true)}>
                                <FormItem>
                                    {getFieldDecorator('r_userName', {
                                        rules: [{required: true, message: '请输入用户名！'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                               placeholder="Username" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('r_password', {
                                        rules: [{required: true, message: '请输入密码！'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="Password" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('r_confirmPassword', {
                                        rules: [{required: true, message: '请确认密码！'},{
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                               type="password" placeholder="Confirm password" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}


export default Form.create({})(Mobile_Header)