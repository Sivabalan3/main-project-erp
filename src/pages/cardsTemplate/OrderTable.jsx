import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { LoadingOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined,DollarOutlined } from '@ant-design/icons';
import { Table, Tag, Spin, } from 'antd';
import { ErpLayout } from '@/layout';
function OrderTable() {
    const cart = useSelector((state) => state.cart);
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = axios.get('http://localhost:8888/userorders/')
                setDatas((await response).data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    const customercolumns = [
        {
            title: 'OrderId',
            dataIndex: 'orderid',
            key: 'orderid',

        },
        {
            title: 'Name',
            dataIndex: 'firstname',
            key: 'firstname',

        },
        {
            title: 'Phone 1',
            dataIndex: 'phone1',
            key: 'phone1',
        },
        {
            title: 'Phone 2',
            dataIndex: 'phone2',
            key: 'phone2',
        },
        {
            title: 'Gmail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Payment Mode',
            dataIndex: 'paymentoption',
            key: 'paymentoption',
            render: (text, record) => {
                if(text==='cash'){
                 return(
                   <Tag  color='orange' icon={<DollarOutlined />}>
                       {text}
                     </Tag>
                 )
                }
                else {
                 return (
                   <Tag color="cyan" >
                     {text}
                   </Tag>
                 )
               }
               },
        },
        {
            title: 'Status',
            dataIndex: 'orderstatus',
            key: 'orderstatus',
            render: (text, record) => {
                if (text === 'pending') {
                    return (

                        <Tag icon={<SyncOutlined spin />} color="processing" style={{ color: text === 'pending' ? 'red' : text === 'deliverd' ? 'green' : 'blue' }}>
                            {text}
                        </Tag>
                    )
                } else if (text === 'deliverd') {
                    return (

                        <Tag icon={<CheckCircleOutlined />} color="success" style={{ color: text === 'deliverd' ? 'green' : 'blue' }}>
                            {text}
                        </Tag>
                    );
                } else {
                    return (
                        <Tag icon={<ClockCircleOutlined />} color="blue" style={{ color: text === 'shipping' ? 'blue' : 'red' }}>
                            {text}
                        </Tag>
                    )
                }
            },
        }


    ];
    return (
        <>
            <ErpLayout>
                <Table columns={customercolumns} dataSource={datas} size="small" pagination={false} bordered={false} loading={loading} />
            </ErpLayout>
        </>
    )
}

export default OrderTable