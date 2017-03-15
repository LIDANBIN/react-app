/**
 * Created by lidanbin on 2017/3/12.
 */
import React, {Component} from 'react'
import {Col, Row} from 'antd'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={24} className="footer">
                        &copy;&nbsp;2016 ReactNews. All Rights Reserved.
                    </Col>
                </Row>
            </footer>
        )
    }
}