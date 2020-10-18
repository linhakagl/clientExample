import React, {useEffect,useState} from 'react'
import { Table, Divider, Popconfirm ,Button, Icon , Col ,Row ,Form ,Input ,Select } from "antd";
import RolesApi from './../../../services/RolesApi'
import TargetTypeApi from './../../../services/TargetTypeApi'
import  ConfigToolDialog  from './Dialog/ConfigToolDialog';

const { Option } = Select;

function ToolsConfig() {
    const [ListRoles, setListRoles] = useState([]);
    const [SelecttedRole, setSelecttedRole] = useState(0)
    const [ListData, setListData] = useState([]);
    const [ToolDialog, setToolDialog] = useState({show: false,targetTypeId: 0});

    useEffect(() => {
        GetAllRole();
        GetListAllTargetType();
    }, [])
    async function GetAllRole(){
       var res = await RolesApi.listAll();
      if(res && res.status === 200){
          setListRoles(res.data)
          if(res.data){
              setSelecttedRole(res.data[0].roleId)
          }
      }
    }

    async function GetListAllTargetType(){
            var res = await TargetTypeApi.listAll();
            if(res && res.status === 200){
                let stt = 1;
                for (let item of res.data) {
                    item.stt = stt;
                    stt++;
                }
                setListData(res.data);                
            }
    }

    function onOpenConfigTool(text, record) {
        setToolDialog({
            show: true,
            targetTypeId: text
        })
    }

    function onCloseDialogTools(){
        setToolDialog({
            show: false,
            targetTypeId: 0
        })
    }

    function onSelectChange(data) {
        setSelecttedRole(data)
    }
    const columns = [
        {
        title: "STT",
        dataIndex: "stt",
        key: "1",
        width: "50px"
        },
        {
          title: "Têm màn hình",
          dataIndex: "targetName",
          key: "targetName"
        },
      
        {
          title: "Code",
          dataIndex: "targetCode",
          key: "targetCode"
        },
      
        // {
        //   title: "Trạng thái",
        //   dataIndex: "bankNumber",
        //   key: "bankNumber"
        // },
      
        // {
        //   title: "Chi Nhánh",
        //   dataIndex: "bankBranch",
        //   key: "bankBranch"
        // },
      
        {
        title: "Thao tác",
        key: "4",
        dataIndex: "targetTypeId",
        render: (text, record) => (
            <>
           <Button
						type="primary"
						size='small'
						className='btn-orange'
						onClick={() => {
							onOpenConfigTool(text, record);
						}}
					>
						<Icon type="edit" />
						Sửa giá
					</Button>
					<Divider type="vertical" />
					<Button
						type="primary"
						size='small'
						onClick={() => {
							this.onEdit(text, record);
						}}
						className='btn-info'
					>
						<Icon type="eye-invisible" />
						Ẩn Tool
					</Button>
            </>
        )
        }
    ]
    return (
        <div>
            <p className='card-subtitle'>Bạn có thể 
                    <span className='code'> chỉnh sửa giá, bật/tắt </span>
                    các dịch vụ
                    <span className='code'> theo từng level của khách </span>
                    tại đây

            </p>
            <Row>
                <Col span={6} className='search-form' style={{marginLeft: '15px'}}>
                     <Form.Item label="Chọn Level:">
                        <Select style={{width : '100%'}} value={SelecttedRole} onChange={onSelectChange}>
                            {ListRoles.map(item => {
                             return <Option value={item.roleId} key={item.roleId}>{item.roleName}</Option>    
                            })}
                        </Select>
                    </Form.Item>   
                </Col>
                <Col>
                     <div style={{float : "right"}}>
                            <Button type="primary" className='btn-info mr-10'>
                                Thay đổi giá theo %
                            </Button>
                            <Button type="primary" >
                                 Reset Giá
                            </Button>
                        </div>
                </Col>
                
            </Row>
            <Row>
            <Table
                columns={columns}
                dataSource={ListData}
                rowKey="id"
                pagination={false}
                className='table-custom table-striped'
                size='small'
                />
            </Row>
            {ToolDialog.show ? (
                <ConfigToolDialog
                    onCloseDialog={onCloseDialogTools}
                    {...ToolDialog}
                    SelecttedRole={SelecttedRole}
                />
            ) : null}
        </div>
    )
}

export default ToolsConfig
