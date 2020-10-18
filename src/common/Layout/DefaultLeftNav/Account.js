import React, { useContext  } from 'react'
import avatar from "../../../assets/avatar.png";
import { Icon, Dropdown , Button} from "antd";
import { AppContext } from '../../../context';


export default function Account(props) {
    const value = useContext(AppContext);
   
    return (
        <div className='dropdown profile-element'>
            <img src={avatar} alt="avatar" style={{ width: '60px' }} className='rounded-circle' />
            <div>
                <Dropdown overlay={props.menu}>                
                    <Button  type="link">{value.userInfo? value.userInfo.account : "DungNQ10"} <Icon type="down" /></Button>

                </Dropdown>
            </div>
        </div>
    )
}
