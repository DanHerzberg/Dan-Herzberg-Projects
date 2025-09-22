import React from 'react';
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';

const { Option } = Select;

const TaskForm = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onAdd({
          ...values,
          dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null
        });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Añadir Nueva Tarea"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Añadir
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="task_form"
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: 'Por favor ingresa el título de la tarea' }]}
        >
          <Input placeholder="Título de la tarea" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Descripción"
        >
          <Input.TextArea rows={4} placeholder="Descripción de la tarea" />
        </Form.Item>
        
        <Form.Item
          name="priority"
          label="Prioridad"
          rules={[{ required: true, message: 'Por favor selecciona la prioridad' }]}
        >
          <Select placeholder="Selecciona la prioridad">
            <Option value="alta">Alta</Option>
            <Option value="media">Media</Option>
            <Option value="baja">Baja</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="dueDate"
          label="Fecha límite"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
