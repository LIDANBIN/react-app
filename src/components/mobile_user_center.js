/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {Tabs, Upload, Icon, Modal, Card} from 'antd'
import axios from 'axios'


export default class Mobile_Center extends Component {

    state = {
        myComments: [],
        myCollections: [],
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }

    componentWillMount() {
        const userId = localStorage.userId
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const myCollections = response.data.map((item, index) => {
                    return {
                        newsId: item.uniquekey,
                        title: item.Title
                    }
                })
                this.setState({myCollections})
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
            })
    }
    handleCancel = () => this.setState({previewVisible: false})
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }
    handleChange = ({fileList}) => this.setState({fileList})

    render() {
        const TabPane = Tabs.TabPane
        const {previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const myCollections = this.state.myCollections.map((item, index) => {
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
                <Tabs>
                    <TabPane style={{padding:'10px'}} key='1' tab="我的收藏">
                        <p>collection</p>
                        {myCollections}
                    </TabPane>
                    <TabPane style={{padding:'10px'}} key="2" tab="我的评论">
                        <p>comments</p>
                        {myComments}
                    </TabPane>
                    <TabPane key="3" tab="更换头像">
                        <div style={{padding:'10px'}} className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 20 ? null : uploadButton}                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}