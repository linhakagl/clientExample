import React from 'react'
import { Result, Button } from 'antd';

function AccessDenied(props) {
    function backToHOme(){
        props.history.push('/');
    }
    return (
        <Result
        status="403"
        title="Access is denied"
        subTitle="You do not have permission to view this page."
        extra={<Button type="primary" onClick={backToHOme}>Back Home</Button>}
    />
    )
}

export default AccessDenied
