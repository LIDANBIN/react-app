/**
 * Created by lidanbin on 2017/3/10.
 */
import React, {Component} from 'react'
import LoginForm from "./news_header"
import Footer from './news_footer'

export default class App extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}