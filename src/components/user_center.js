/**
 * Created by lidanbin on 2017/3/10.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {Tabs, Card, Row, Col} from "antd"
import axios from 'axios'


export default class Center extends Component {

    constructor(props) {
        super(props)
        this.state = {
            myCollection: [],
            myComments: []
        }
    }

    componentWillMount = () => {
        const userId = localStorage.userId
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const myCollection = response.data.map((item, index) => {
                    return {
                        newsId: item.uniquekey,
                        title: item.Title
                    }
                })
                this.setState({myCollection})
            })

        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const myComments = response.data.map((item) => {
                    return {
                        newsId: item.uniquekey,
                        dateTime: item.datetime,
                        content: item.Comments
                    }
                })
                this.setState({myComments})
                console.log({myComments})
            })
    }


    render() {
        const TabPane = Tabs.TabPane
        const myCollections = this.state.myCollection.map((item, index) => {
            return (
                <Card key={index} title={item.newsId} extra={<Link to={`/news_detail/${item.newsId}`}>查看</Link>}><p>{item.title}</p></Card>
            )
        })
        const myComments = this.state.myComments.map((item, index) => {
            return (
                <Card key={index} title={`于${item.dateTime}评论了文章${item.newsId}`} extra={<Link to={`/news_detail/${item.newsId}`}>查看</Link>}><p>{item.content}</p></Card>
            )
        })

        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane tab="我的收藏" key="1">
                                {myCollections}
                            </TabPane>
                            <TabPane tab="我的评论" key="2">
                                {myComments}
                            </TabPane>
                            <TabPane tab="设置头像" key="3">
                                fffffffffffff
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}