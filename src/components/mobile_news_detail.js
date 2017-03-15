/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'
import axios from 'axios'
import {BackTop} from 'antd'

import NewsComments from './mobile_newscomments'


export default class Mobile_Detail extends Component {
    state = {
        pagecontent: ''
    }

    componentWillMount() {
        const uniquekey = this.props.params.uniquekey
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const pagecontent = response.data.pagecontent
                this.setState({pagecontent})
            })
    }

    render() {

        const newsdetail = this.state.pagecontent
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html:newsdetail}}></div>
                <NewsComments uniquekey={this.props.params.uniquekey}/>
                <BackTop/>
            </div>
        )
    }
}