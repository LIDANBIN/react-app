/**
 * Created by lidanbin on 2017/3/10.
 */
import React, {Component} from 'react'
import {Row, Col, BackTop} from 'antd'
import axios from 'axios'

import ImageBlock from './imageblock'
import NewsComment from './news_comment'

export default class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newsDetail: ''
        }
    }

    componentWillMount() {
        this.showDetail(this.props)

    }
    componentWillReceiveProps(nextProps) {
        this.showDetail(nextProps)
    }

    showDetail = (props) => {
        const newsId = props.params.newsId
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                const newsDetail = response.data
                this.setState({newsDetail})
            })
    }



    render() {
        const {newsDetail} = this.state



        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div className="container">
                            <div dangerouslySetInnerHTML={{__html:newsDetail.pagecontent}}></div>
                            <hr/>
                            <NewsComment newsId={this.props.params.newsId}/>
                        </div>
                    </Col>
                    <Col span={6}>
                        <ImageBlock title="娱乐新闻" count={16} type="yule" cardWidth="100%" imgWidth="138px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}