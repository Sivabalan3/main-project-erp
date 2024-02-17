import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import { LoadingOutlined, CheckCircleOutlined, SyncOutlined, ClockCircleOutlined,DollarOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';
import { Tag } from 'antd';

export default function People() {
  const translate = useLanguage();
  const entity = 'people';
  const searchConfig = {
    displayLabels: ['firstname', 'lastname'],
    searchFields: ['firstname,lastname,',],
  };
  const deleteModalLabels = ['firstname', 'lastname'];

  const dataTableColumns = [
    {
      title: translate('Order Id'),
      dataIndex: 'orderid',
    },
    {
      title: translate('Name'),
      dataIndex: 'firstname',
      render: (text) => {
        const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
        return <Tag color="processing">{capitalizedText}</Tag>
      }
    },
    {
      title: translate('phone1'),
      dataIndex: 'phone1',
      // render: (text) => {
      //   return <Tag>{text}</Tag>;
      // },
    },

    {
      title: translate('email'),
      dataIndex: 'email',
    },
    // {
    //   title: translate('Phone2'),
    //   dataIndex: 'phone2',
    // },
    {
      title: translate('address'),
      dataIndex: 'address',
    },
    {
      title: translate('paymentoption'),
      dataIndex: 'paymentoption',
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
      title: translate('Status'),
      dataIndex: 'orderstatus',
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
    },
  ];

  const readColumns = [
    {
      title: translate('OrderId'),
      dataIndex: 'orderid',
    },
    {
      title: translate('Name'),
      dataIndex: 'firstname',
    },
    {
      title: translate('phone1'),
      dataIndex: 'phone1',

    },
    {
      title: translate('phone2'),
      dataIndex: 'phone2',
    },
    {
      title: translate('address'),
      dataIndex: 'address',
    },
    {
      title: translate('paymentoption'),
      dataIndex: 'paymentoption',
    },
    {
      title: translate('OrderStatus'),
      dataIndex: 'orderstatus',
    },

    {
      title: translate('Email'),
      dataIndex: 'email',
    },
  ];
  const Labels = {
    PANEL_TITLE: translate('order'),
    DATATABLE_TITLE: translate('Order List'),
    ADD_NEW_ENTITY: translate('add_new_Order'),
    ENTITY_NAME: translate('person'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    // fields,
    readColumns,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
