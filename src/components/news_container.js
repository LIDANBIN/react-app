/**
 * Created by lidanbin on 2017/3/10.
 */
import React, {Component} from 'react'
import {Row, Col, Carousel, Tabs} from 'antd'

import ImageBlock from './imageblock'
import NewsList from './newslist'
import Products from './newsproducts'

import img1 from '../images/carousel_1.jpg'
import img2 from '../images/carousel_2.jpg'
import img3 from '../images/carousel_3.jpg'
import img4 from '../images/carousel_4.jpg'

export default class Container extends Component {
    render() {
        const TabPane = Tabs.TabPane

        return (
            <div className="container">
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer">
                            <Carousel autoplay infinite>
                                <div><img src={img1} alt="img1"/></div>
                                <div><img src={img2} alt="img2"/></div>
                                <div><img src={img3} alt="img3"/></div>
                                <div><img src={img4} alt="img4"/></div>
                            </Carousel>
                            <ImageBlock title="国际头条" count={6} type="top" cardWidth="100%" imgWidth="112px"/>
                        </div>
                        <div>
                            <Tabs className="tabs_news">
                                <TabPane tab="国际新闻" key="1">
                                    <NewsList type="guoji" count={23}/>
                                </TabPane>
                                <TabPane tab="科技新闻" key="2">
                                    <NewsList type="keji" count={23}/>
                                </TabPane>
                            </Tabs>
                        </div>

                        <Tabs className="tabs_news">
                            <TabPane tab="ReactNews产品" key="1">
                                <Products />
                            </TabPane>
                        </Tabs>

                        <ImageBlock title="国内新闻" count={8} type="guonei" cardWidth="100%" imgWidth="138px"/>
                        <ImageBlock title="娱乐新闻" count={16} type="yule" cardWidth="100%" imgWidth="138px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}