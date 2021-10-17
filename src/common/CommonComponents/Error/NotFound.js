import React from 'react'
import { Result, Button } from 'antd';


function NotFound(props) {
    function backToHOme(){
        props.history.push('/');
    }
    return (
        <Result
            status="404"
            title="Not Found"
            subTitle="'Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={backToHOme}>Back Home</Button>}
        />
    )
}

export default NotFound

