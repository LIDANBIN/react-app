/**
 * Created by lidanbin on 2017/3/14.
 */
import React, {Component} from 'react'

import MobileHeader from './mobile_header'
import Footer from './news_footer'

export default class Mobile_App extends Component {
    render() {
        return (
            <div>
                <MobileHeader />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}