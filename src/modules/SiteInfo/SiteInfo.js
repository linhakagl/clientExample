import React, { Component } from 'react'
import  PageName  from "../../common/CommonComponents/PageName"
import { Tabs } from 'antd';
import WebsiteConfig from './Tabs/WebsiteConfig'
import ToolsConfig from './Tabs/ToolsConfig'
import NotificationConfig from './Tabs/NotificationConfig'
import BanksConfig from './Tabs/BanksConfig'
import UiConfig from './Tabs/UiConfig'


const { TabPane } = Tabs;

export class SiteInfo extends Component {
    onTabChange = () => {

    }
    render() {
        return (
            <>
                <PageName text='Site Config' />
                <div className="page-content">
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab="Cài Đặt Website" key="1">
                        <WebsiteConfig/>
                    </TabPane>
                    <TabPane tab="Cài Đặt Công Cụ" key="2">
                        <ToolsConfig/>
                    </TabPane>
                    <TabPane tab="Cài đặt Thông báo" key="3">
                        <NotificationConfig/>
                    </TabPane>
                    <TabPane tab="Cài thông tin thanh toán" key="4">
                        <BanksConfig/>
                    </TabPane>
                    {/* <TabPane tab="Cài đặt giao diện trang" key="5">
                        <UiConfig/>
                    </TabPane> */}
                </Tabs>
                </div>

            </>
        )
    }
}

export default SiteInfo
