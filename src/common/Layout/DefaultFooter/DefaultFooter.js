import React,{useContext} from 'react'
import { Col, Row, Icon,Button } from 'antd';
import { withTranslation } from "react-i18next";
import logo from "../../../assets/logo.png";
import {  AppContext } from "../../../context";

function DefaultFooter(props) {
  
  const appContext = useContext(AppContext);
  console.log(appContext)
  return (
    <>
      <hr />
     
      <Row style={{ 'color': 'green' }} gutter={2}>
        
        <Col span={13} className="footer-link-text">
          <p>{appContext.siteInfo.siteFooter}</p>                     
        </Col>
        <Col span={11} style={{ 'color': '#676a6c', 'fontSize': '13', 'float': 'right'}}>
         
        </Col>
      </Row>
    </>
  )
}

export default withTranslation()(DefaultFooter)

