import React,{useContext, useState, useEffect} from 'react'
import { Table, Divider, Popconfirm ,Button, Icon , Col ,Row ,Card ,Input} from "antd";
import {  AppContext } from "../../../context";
import BankInfoDialog from './Dialog/BankInfoDialog'
import BankInfoApi from '../../../services/BankInfoApi'

const { TextArea } = Input;

function BanksConfig() {
    const appContext = useContext(AppContext)
    const [list, setlist] = useState([]);
    const [bankInfoDialog, setBankInfoDialog] = useState( {
        show: false,
        isEdit: false,
        id: 0
      });

    useEffect(() => {
       let data = appContext.siteInfo.bankInfo;
       let stt = 1;
       data.forEach(item => {
        item.stt = stt;
        stt ++;
       });
       setlist(data)
    }, [appContext.siteInfo.bankInfo])
    
    function _OpenBankDialog (isEdit = false, id = 0) {
        let dialog = { ...bankInfoDialog};
        dialog.show = true;
        dialog.isEdit = isEdit;
        dialog.id = id;
        setBankInfoDialog(dialog);
    }
    function _CloseBankDialog (callBack = false) {
        let dialog = { ...bankInfoDialog };
        dialog.show = false;
        dialog.isEdit = false;
        dialog.id = 0;
        setBankInfoDialog(dialog);
        if (callBack) {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      };

    function onEdit (id){
        _OpenBankDialog(true, id);
    }

    function onDelete(id){
        BankInfoApi.delete(id).then(res => {
            if (res && res.status === 200) {
              window.location.reload();
            }
          });
    }

    const columns = [
                {
                title: "STT",
                dataIndex: "stt",
                key: "1",
                width: "50px"
                },
                {
                  title: "Ngân Hàng",
                  dataIndex: "bankName",
                  key: "bankName"
                },
              
                {
                  title: "Chủ TK",
                  dataIndex: "bankAccount",
                  key: "bankAccount"
                },
              
                {
                  title: "Số TK",
                  dataIndex: "bankNumber",
                  key: "bankNumber"
                },
              
                {
                  title: "Chi Nhánh",
                  dataIndex: "bankBranch",
                  key: "bankBranch"
                },
              
                {
                title: "Thao tác",
                key: "4",
                dataIndex: "id",
                render: (text, record) => (
                    <span>                    
                    <Button
						type="primary"
						size='small'
						className='btn-info'
						onClick={() => {
							onEdit(text, record);;
						}}
					>
						<Icon type="edit" />
						Sửa
					</Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa?"
                        onConfirm={() => onDelete(text, record)}
                        okText="Có"
                        cancelText="Không"
                    >
                       <Button type="danger" size='small'>
						<Icon type="delete" />
						Xóa
					</Button>
                    </Popconfirm>
                    </span>
                )
                }
            ]
    return (
        <div>
             <p className='card-subtitle'>Bạn có thể cài đặt 
                    <span className='code'> thông tin tài khoản ngân hàng, hướng dẫn nạp tiền, cú pháp </span>
                    của trang tại đây
            </p>
                <Row>
                    <Col span={16}>
                        <p>Thông tin tài khoản ngân hàng:</p>
                    </Col>
                <Col span={8}>
                        <div style={{float : "right"}}>
                            <Button type="primary" className='btn-info' onClick={() => _OpenBankDialog(false, 0) }>
                                <Icon type="plus" /> Thêm ngân hàng
                            </Button>
                        </div>
                       
                </Col>
                </Row>
                
            <Row>
            <Table
                columns={columns}
                dataSource={list}
                rowKey="id"
                pagination={false}
                className='table-custom table-striped'
                size='small'
                />
            </Row>
            <Row style={{marginTop: '10px'}}>
                <p>Cài đặt nội dung chuyển khoản:</p>
                <Card style={{  background: '#b8e7fc' }} className='info-card'>
                    <h4>Hướng dẫn</h4>
                    <p>Bạn có thể nhập thêm cú pháp: <span className='code'>{'{username}'}</span> để hiển thị username người dùng.</p>
                    <p>Ví dụ: <span className='code'>{'NAPTIEN {username}'}</span></p>
                </Card>
            </Row>          
            <Row style={{marginTop: '10px'}}>
                <Input/>
            </Row>
            <Row style={{marginTop: '10px'}}>
                <p>Cài đặt hướng dẫn hiển thị cho khách hàng:</p>
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
            </Row>
            {bankInfoDialog.show? (
                <BankInfoDialog 
                    onCloseDialog={_CloseBankDialog}
                    {...bankInfoDialog}/>    
            ): null}
        </div>
    )
}

export default BanksConfig
