/**
 * Created by lidanbin on 2017/3/10.
 */
import React, {Component} from 'react'
import {Link} from "react-router"
import axios from 'axios'
import logo from '../images/logo.png'
import {Row, Col, Menu, Icon, Modal, Button, Tabs, Form, Input, message} from 'antd'


class Header extends Component {
    state = {
        current: 'mail',
        userName: null,
        visible: false,
        userId: null
    }
    componentWillMount = () => {
        const userId = localStorage.userId
        const userName = localStorage.userName
        if(userId) {
            this.setState({userId, userName})
        }
    }

    handleClick = (event) => {
        this.setState(
            {current: event.key}
        )
        if(event.key === 'register') {
            this.setState(
                {visible: true}
            )
        }
    }
    handleOk = (event) => {
        this.setState(
            {visible: false}
        )
    }
    handleCancel = (event) => {
        this.setState(
            {visible: false}
        )
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
                        message.error('登录失败。')
                    } else {
                        message.success('登录成功。')
                        this.setState(
                            {
                                userId: result.UserId,
                                userName: result.NickUserName
                            }
                        )
                        localStorage.userId = result.UserId
                        localStorage.userName = result.NickUserName
                    }
                }
            })
        this.setState({
            visible: false
        })
    }
    handleLogout = () => {
        localStorage.userId = ''
        localStorage.userName = ''
        this.setState(
            {
                userId: null,
                userName: null
            }
        )
    }

    render() {
        const TabPane = Tabs.TabPane
        const FormItem = Form.Item
        const {getFieldDecorator} = this.props.form
        const userName = this.state.userName
        const userItem = userName ? (
            <Menu.Item key="logoout" className="register">
                <Button type="primary">{userName}</Button>&nbsp;&nbsp;
                <Link to='/center'><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
                <Button type="ghost" onClick={this.handleLogout}>退出</Button>
            </Menu.Item>
        ) : (
            <Menu.Item  key='register' className="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>
        )
        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <Link to='/'>
                        <div className="logo">
                            <img src={logo} alt="logo"/><span>ReactNews</span>
                        </div>
                        </Link>
                    </Col>
                    <Col span={19}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userItem}
                        </Menu>
                        <Modal title="用户登录" visible={this.state.visible}
                               onOk={this.handleOk} onCancel={this.handleCancel}
                        >
                            <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('userName', {
                                                rules: [{required: true, message: '请输入用户名！'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Username"/>
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password', {
                                                rules: [{required: true, message: '请输入密码！'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type="password" placeholder="Password"/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" size="large">登录</Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form  onSubmit={this.handleSubmit.bind(this, true)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('r_userName', {
                                                rules: [{required: true, message: '请输入用户名！'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                                       placeholder="Username"/>
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password', {
                                                rules: [{required: true, message: '请输入密码！'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type="password" placeholder="Password"/>
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword', {
                                                rules: [{required: true, message: '请确认密码！'},{
                                                    validator: this.checkPassword,
                                                }],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                                       type="password" placeholder="Confirm password"/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" size="large">注册</Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        )
    }
}
const LoginForm = Form.create()(Header);

export default LoginForm