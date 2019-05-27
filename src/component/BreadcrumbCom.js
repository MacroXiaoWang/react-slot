import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';

class BreadCrumbCom extends Component {

    render() {
        return (
            <Breadcrumb style={{margin: '12px 0'}}>
                <Breadcrumb.Item><Link to={'/home'}>首页</Link></Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default BreadCrumbCom;