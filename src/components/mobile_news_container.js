/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'
import {Tabs, Carousel, BackTop} from 'antd'

import img1 from '../images/carousel_1.jpg'
import img2 from '../images/carousel_2.jpg'
import img3 from '../images/carousel_3.jpg'
import img4 from '../images/carousel_4.jpg'

import Mobile_imageBlock from './mobile_imageblock'




export default class Mobile_container extends Component {

    render() {
        const TabPane = Tabs.TabPane;
        const imageListInfo = {
            cardWidth: "100%",
            count: 15,
            imageWidth: "27%"
        }

        return (
            <div>
                <BackTop/>
                <Tabs defaultActiveKey="top">
                    <TabPane tab="头条" key="top">
                        <Carousel style={{width: '100%'}} autoplay infinite>
                            <div><img style={{width: '100%'}} src={img1} alt="img1"/></div>
                            <div><img style={{width: '100%'}} src={img2} alt="img2"/></div>
                            <div><img style={{width: '100%'}} src={img3} alt="img3"/></div>
                            <div><img style={{width: '100%'}} src={img4} alt="img4"/></div>
                        </Carousel>
                        <Mobile_imageBlock type="top" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="社会" key="shehui">
                        <Mobile_imageBlock type="shehui" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="国内" key="guonei">
                        <Mobile_imageBlock type="guonei" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="国际" key="guoji">
                        <Mobile_imageBlock type="guoji" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="科技" key="keji">
                        <Mobile_imageBlock type="keji" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="娱乐" key="yule">
                        <Mobile_imageBlock type="yule" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="体育" key="tiyu">
                        <Mobile_imageBlock type="tiyu" {...imageListInfo}/>
                    </TabPane>
                    <TabPane tab="时尚" key="shishang">
                        <Mobile_imageBlock type="shishang" {...imageListInfo}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}