import React from 'react';
import { Table, Tag, Space, Button, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TaskList = ({ tasks, onDelete }) => {
  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      key: 'priority',
      render: priority => {
        let color = 'green';
        if (priority === 'alta') {
          color = 'red';
        } else if (priority === 'media') {
          color = 'orange';
        }
        return (
          <Tag color={color}>
            {priority.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Fecha límite',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  if (tasks.length === 0) {
    return <Empty description="No hay tareas" />;
  }

  return (
    <Table 
      columns={columns} 
      dataSource={tasks} 
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default TaskList;
