import React, { PureComponent } from 'react'
import { Select, Spin, Tooltip } from 'antd';
import UsersApi from "../../services/UsersApi";
import { AppContext } from "../../context"

const Option = Select.Option;

export class UserPicker extends PureComponent {
    // static getDerivedStateFromProps(nextProps) {
    //     // Should be a controlled component.
    //     if ('value' in nextProps) {
    //         return {
    //             value: (nextProps.value || []),
    //         };
    //     }
    //     return null;
    // }
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                value: 0,
                text: 'Typing at least 3 characters to search!',
                disabled: true
            }],
            value: [],
            fetching: false
        };

    }


    fetchUser = value => {
        if (value.length < 3) {
            this.setState({
                data: [{
                    value: 0,
                    text: 'Typing at least 3 characters to search!',
                    disabled: true
                }]
            })
            return
        }
        this.setState({ data: [], fetching: true });
        UsersApi.getUserSelect(value,this.context.siteInfo.siteId).then(res => {
            if (res && res.status === 200 && res.data) {     
                const data = res.data.map(item => {
                    let obj = {};
                    obj.value = item.userID ;
                    obj.text = item.account ;
                    return obj;
                })
                this.setState({ data: data, fetching: false });
            }
        });
    };

    handleChange = value => {
        if(this.props.onChange){
            this.props.onChange(value)
        }
    };

    render() {
        const { fetching, data } = this.state;
        return (
            <>
                <Tooltip placement="bottom" title={this.state.tip}>
                    <Select
                        {...this.props}
                        value={this.props.value}
                        allowClear={this.props.singe}
                        showSearch={true}
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={false}
                        onSearch={this.fetchUser}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                        
                    >
                        {data.map(d => (
                            <Option key={d.value} disabled={d.disabled}>{d.text}</Option>
                        ))}
                    </Select>
                </Tooltip>
            </>
        )
    }
}

export default UserPicker