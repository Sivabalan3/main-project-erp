import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table } from 'antd';
import { ErpLayout } from '@/layout';
function OrderTable() {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = axios.get('http://localhost:8888/userorder/')
                setDatas((await response).data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoading(false);
            }
        }
        fetchData()
    }, [])
    const updateOrder = async (id) => {
        // Get the current data for the order
        const currentOrder = datas.find(data => data.orderid === id);
        
        // Create a copy of the current data to serve as the updated order
        let updatedOrder = { ...currentOrder };
        
        // TODO: Open a form that allows the user to input the new data for the order
        // The form should update the `updatedOrder` object
        
        try {
            await axios.put(`http://localhost:8888/userorder/${id}`, updatedOrder);
            // Refresh the data
            fetchData();
        } catch (error) {
            console.error('Error updating order: ', error);
        }
    };
    

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8888/userorder/${id}`);
            // Refresh the data
            fetchData();
        } catch (error) {
            console.error('Error deleting order: ', error);
        }
    };

    const customercolumns = [
        {
            title: 'OrderId',
            dataIndex: 'orderid',
            key: 'orderid',

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

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
            dataIndex: 'gmail',
            key: 'gmail',
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
        },
        {
            title: 'Status',
            // dataIndex: 'paymentoption',
            key: 'Status',
        },
        {
            title: 'Update',
            key: 'update',
            render: (text, record) => (
                <button onClick={() => updateOrder(record.orderid)}>Update</button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <button onClick={() => deleteOrder(record.orderid)}>Delete</button>
            ),
        },
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