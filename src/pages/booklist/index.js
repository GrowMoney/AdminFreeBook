import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button,Modal, Form ,Input ,Space ,Popconfirm } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function AddBook(props){
    const [form] = Form.useForm();
    const onFinish = values => {
        props.addBooks(values['books'])
        form.resetFields();
        props.onOk();
    };
    const cancel = () =>{
        props.onCancel();
    }
    return (
        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          <Form.List name="books">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'book_name']}
                      fieldKey={[fieldKey, 'book_name']}
                      rules={[{ required: true, message: 'Missing Book Name' }]}
                    >
                      <Input placeholder="Book Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'author']}
                      fieldKey={[fieldKey, 'author']}
                      rules={[{ required: true, message: 'Missing Author name' }]}
                    >
                      <Input placeholder="Author Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'publish_year']}
                      fieldKey={[fieldKey, 'publish_year']}
                      rules={[{ required: true, message: 'Missing Publish Year' }]}
                    >
                      <Input placeholder="Publish Year" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      fieldKey={[fieldKey, 'description']}
                      rules={[{ required: true, message: 'Missing Description' }]}
                    >
                      <Input placeholder="Description" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Book
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary"  htmlType="submit">
              Submit
            </Button>
            <Button style={{
                marginLeft:'3vw'
            }} type="primary" onClick={()=>cancel()}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      );
}

function BookList(){
    const [dataSource ,setDataSource] = useState([
        {
            key: '0',
            book_name: 'Book 1',
            author : 'Nico',
            publish_year: '2021',
            description : 'just a sample'
        },
        {
            key: '1',
            book_name: 'Book 2',
            author : 'WIlliam',
            publish_year: '2021',
            description : 'Just a sample too'
        },
    ]);
    const columns = [
        {
            title: 'Book Name',
            dataIndex: 'book_name',
            key: 'book_name',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Publish Year',
            dataIndex: 'publish_year',
            key: 'publish_year',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
              dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                  <a>Delete</a>
                </Popconfirm>
              ) : null,
          },
        ];
    const [modalVisible ,setModalVisible] = useState(false)
    const showModal = () => {
        setModalVisible(true);
      };
    
      const handleOk = () => {
        setModalVisible(false);
      };
    
      const handleCancel = () => {
        setModalVisible(false);
      };
 
    const handleAdd = (data)=>{
        var states = {
            key : '',
            book_name: '',
            author : '',
            publish_year: '',
            description : ''
        }
        var copyIndex = dataSource.length
        var dataTmp = []
        for(var i = 0 ; i < data.length ;i++){
            var copy = {...states};
            copy['key'] = copyIndex;
            copy['book_name'] = data[i]['book_name']
            copy['author'] = data[i]['author']
            copy['publish_year'] = data[i]['publish_year']
            copy['description'] = data[i]['description']
            copyIndex++;
            dataTmp.push(copy)
        }
        setDataSource([...dataSource,...dataTmp])
    }

    const handleDelete = (data)=>{
        var dataTmp = [...dataSource]
        dataTmp = dataTmp.filter(item => item['key']!== data )
        setDataSource([...dataTmp])
    }
    return(
        <div>
            <Button
                onClick={showModal}
                type="primary"
                style={{
                marginBottom: 16,
                }}
            >
                Add a row
            </Button>
            <Table
                dataSource={dataSource}
                columns={columns}
            />
            <Modal footer={null} title="Add Book" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
                <AddBook addBooks={handleAdd} onOk={handleOk} onCancel={handleCancel}/>
            </Modal>
        </div>
    )
}
export default BookList;