import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link,NavLink,useHistory } from "react-router-dom";
import { Menu, Button } from 'antd';
import {
  CodeSandboxOutlined,
  FormOutlined,
  SettingOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  AppleOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  DropboxOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default function SidBar()  {
  const history = useHistory();

  function handleNavigate(route) {
    history.push(route)
  }
  const [collapsed, setcollapsed] = useState(false)

  const toggleCollapsed = () => {
    setcollapsed(!collapsed)
  };



    return (
      <Router>
        <div style={{ width: '20vw', maxWidth: '20vw', minHeight: '100vh' }}>
          <Menu
            defaultSelectedKeys={['1']}
           //defaultOpenKeys={['sub1'], ['sub2']}
            mode="inline"
            theme="white"
            inlineCollapsed={collapsed}
            style={{ maxWidth: '20vw', height: '100vh', position: 'fixed', boxShadow: '0 6px 20px rgba(56, 125, 255, 0.17)', fontSize: '18px' }}
          >
             <Menu.Item onClick={() => handleNavigate('/tableau')} key="1" icon={<BarChartOutlined />}>
              Tableau de bord
             </Menu.Item>
             <SubMenu key="sub1" icon={<SettingOutlined />} title="Paramètre">
              <Menu.Item onClick={() => handleNavigate('/entreprise')} key="2" icon={<HomeOutlined />}>
              Entreprise
              </Menu.Item>
              <Menu.Item onClick={() => handleNavigate('/user')} key="3" icon={<UserOutlined />}>
                Utillisateur
              </Menu.Item>
            </SubMenu>
            <Menu.Item onClick={() => handleNavigate('/client')} key="4" icon={<UserOutlined />}>
            Clients
          </Menu.Item>
            <Menu.Item onClick={() => handleNavigate('/fournisseur')}key="5" icon={<UserOutlined />}>
            Fournisseurs
          </Menu.Item>
            <Menu.Item onClick={() => handleNavigate('/produit')} key="6" icon={<DropboxOutlined />}>
            Produits et Services
          </Menu.Item>
            <SubMenu key="sub2" icon={<FormOutlined />} title="Facturation">
              <Menu.Item onClick={() => handleNavigate('/factureclient')} key="7" icon={<FormOutlined />}>
              Facture Client
              </Menu.Item>
              <Menu.Item onClick={() => handleNavigate('/facture')} key="8" icon={<FormOutlined />} style={{ fontSize: '16px'}}>
                  Facture Fournisseur
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Router>
    );
  
}


const mountNode = document.getElementById("root");
ReactDOM.render(<SidBar />, mountNode);
