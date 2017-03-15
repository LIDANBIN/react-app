/**
 * Created by lidanbin on 2017/3/12.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'

import axios from 'axios'

export default class NewsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newsArr: []
        }
    }

    componentWillMount = () => {
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                const newsArr = response.data.map((item) => {
                    return {
                        title: item.title,
                        newsId: item.uniquekey
                    }
                })
                this.setState({newsArr})
            })
    }

    render() {
        const newsArr = this.state.newsArr
        const liList = newsArr.length ? (newsArr.map((item, index) => <Link key={index} to={`/news_detail/${item.newsId}`}>
            <li key={index}>{item.title}</li>
        </Link>)) : (
            <p>没有获取到任何数据。</p>)
        return (
            <Card className="topNewsList">
                <ul>
                    {liList}
                </ul>
            </Card>
        )
    }
}

NewsList.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
}