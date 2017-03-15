/**
 * Created by lidanbin on 2017/3/13.
 */
import React, {Component} from 'react'
import {Card, Form, Button, message, Input, notification} from 'antd'

import axios from 'axios'

class NewsComment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commentsArr: []
        }
    }

    componentWillMount() {
        const newsId = this.props.newsId
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                const commentsArr = response.data.map((item) => {
                    return {
                        username: item.UserName,
                        dateTime: item.datetime,
                        content: item.Comments
                    }
                })
                this.setState({commentsArr})
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const userId = localStorage.userId
        if (!userId) {
            message.warn('请先登录。')
            return
        }
        const newsId = this.props.newsId
        const comment = this.props.form.getFieldValue('content')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${comment}`
        axios.get(url)
            .then(response => {
                message.success('评论成功。')
                this.componentWillMount()
                this.props.form.resetFields()
            })
    }

    collectArticle = (event) => {
        const userId = localStorage.userId
        if (!userId) {
            message.warn('请先登录。')
            return
        }
        const {newsId} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message: 'ReactNews收藏',
                    description: '添加收藏成功啦!'
                })
            })
    }

    render() {
        const comments = this.state.commentsArr.map((item, index) => {
            return (
                <Card key={index} title={item.username} extra={item.dateTime}><p>{item.content}</p></Card>
            )
        })

        const {getFieldDecorator} = this.props.form

        return (
            <div>
                {comments}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="您的评论">
                        {
                            getFieldDecorator('content')(<Input type="textarea"/>)
                        }
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>提交评论</Button>
                    <Button type='primary' onClick={this.collectArticle}>收藏文章</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({})(NewsComment)