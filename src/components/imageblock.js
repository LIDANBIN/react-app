/**
 * Created by lidanbin on 2017/3/11.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'
import axios from 'axios'


export default class ImageBlock extends Component {
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
                const newsArr = response.data.map(item => {
                    return {
                        newsTitle: item.title,
                        author_name: item.author_name,
                        image_url: item.thumbnail_pic_s,
                        newsId: item.uniquekey
                    }
                })
                this.setState({newsArr})
            })
    }


    render() {
        const {title, imgWidth, cardWidth} = this.props
        const imgStyle = {
            width: imgWidth,
            height: '90px'
        }
        const titleStyle = {
            width: imgWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
        const newsArr = this.state.newsArr
        const newList = newsArr.length ? (
            newsArr.map((item, index) => (
                    <div key={index} className="imageblock">
                        <Link to={`/news_detail/${item.newsId}`}>
                            <div className="custom-image">
                                <img src={item.image_url} alt="img" style={imgStyle}/>
                            </div>
                            <div className="custom-card">
                                <h3 style={titleStyle}>{item.newsTitle}</h3>
                                <p>{item.author_name}</p>
                            </div>
                        </Link>
                    </div>
                )
            )
        ) : <p>未加载到任何数据。</p>
        return (
            <Card title={title} className="topNewsList" style={{width: cardWidth}}>
                {newList}
            </Card>
        )
    }
}

ImageBlock.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    cardWidth: PropTypes.string.isRequired,
    imgWidth: PropTypes.string.isRequired
}