/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'
import {Card, Form, Button, Input, notification, message} from 'antd'
import axios from 'axios'

class NewsComments extends Component {

    state = {
        commentsArr: []
    }

    componentWillMount() {
        const uniquekey = this.props.uniquekey
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const commentsArr = response.data.map(item => {
                    return {
                        userName: item.UserName,
                        content: item.Comments,
                        datetime: item.datetime
                    }
                })
                this.setState({commentsArr})
            })
    }

    handleSubmit = () => {
        event.preventDefault()
        const userName = localStorage.userName
        const userId = localStorage.userId
        const uniquekey = this.props.uniquekey
        const comment = this.props.form.getFieldValue('content')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${comment}`
        if (!userName) {
            message.warn('请先登录。')
            return
        } else {
            axios.get(url)
                .then(response => {
                    message.success('评论成功。')
                    this.props.form.resetFields()
                    this.componentWillMount()
                })
        }
    }

    collectArticle = () => {
        const userId = localStorage.userId
        const uniquekey = this.props.uniquekey
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
        if (!userId) {
            message.warn('请先登录。')
            return
        } else {
            axios.get(url)
                .then(response => {
                    notification.success({
                        message: 'ReactNews收藏',
                        description: '添加收藏成功啦!'
                    })
                })
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const commentsList = this.state.commentsArr.map((item, index) => {

            return (
                <Card key={index} title={item.userName} extra={item.datetime} style={{width: '100%'}}>
                    <p>{item.content}</p>
                </Card>
            )
        })

        return (
            <div style={{padding: '10px'}}>
                {commentsList}
                <Card style={{width: '100%'}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="您的评论">
                            {
                                getFieldDecorator('content')(<Input style={{width:'100%',margin:'0'}} type="textarea"/>)
                            }
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>提交评论</Button>
                        &nbsp;
                        <Button type='primary' onClick={this.collectArticle}>收藏文章</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}


export default Form.create({})(NewsComments)