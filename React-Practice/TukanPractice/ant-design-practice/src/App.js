import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Divider } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  SettingOutlined,
  PlusOutlined
} from '@ant-design/icons';
import './App.css';

// Importamos nuestros componentes
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setIsModalVisible(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Inicio
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Perfil
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Configuración
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Title level={3} style={{ color: 'white', margin: '16px 24px' }}>
            Gestor de Tareas con Ant Design
          </Title>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Title level={4}>Mis Tareas</Title>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Nueva Tarea
              </Button>
            </div>
            <Divider />
            
            <TaskList tasks={tasks} onDelete={deleteTask} />
            
            <TaskForm 
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              onAdd={addTask}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Mini Proyecto React con Ant Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
