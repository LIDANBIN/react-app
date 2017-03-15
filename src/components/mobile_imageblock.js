/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'
import axios from 'axios'

export default class Mobile_imageBlock extends Component {

    state = {
        newsArr: []
    }

    componentWillMount() {
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                const newsArr = response.data.map(item => {
                    return {
                        title: item.title,
                        realtype: item.realtype,
                        uniquekey: item.uniquekey,
                        date: item.date,
                        image_url: item.thumbnail_pic_s
                    }
                })
                this.setState({newsArr})
            })
    }

    render() {

        const {imageWidth, cardWidth} = this.props
        const newsArr = this.state.newsArr.length ? (this.state.newsArr.map((item, index) => {
                return (
                    <Card key={index} style={{width: cardWidth}}>
                        <Link to={`/news_detail/${item.uniquekey}`}>
                            <img style={{width: imageWidth}} src={item.image_url} alt={item.title}/>
                            <div style={{float: 'right', color: 'black', width: '71%'}}>{item.title}
                                <div style={{color: 'gray', width: '100%', padding: '5px'}}>
                                <span style={{color: 'red', fontWeight: 'bold', border: '1px solid red'}}>
                                    {item.realtype}
                                </span>
                                    &nbsp;
                                    {item.date}
                                </div>
                            </div>
                        </Link>
                    </Card>
                )
            })
        ):(<Card><p>未加载到任何数据。</p></Card>)


        return (
            <div style={{padding: '10px'}}>
                {newsArr}
            </div>
        )
    }
}