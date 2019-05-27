import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {observer} from "mobx-react";
import {Layout, Menu, Icon, Avatar} from 'antd';
import RouterStore from "../store/RouterStore"
import menus from "../json/menu"
import "./index.css";
import RouterCom from "../router"

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@withRouter
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            openKeys: [],
        };
        this.rootSubmenuKeys = this.getRootSubMenuKeys();
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (RouterStore.openKeys.length) {
            RouterStore.openKeys = []
        } else {
            const arr = this.props.history.location.pathname.split("/");
            RouterStore.onOpenChange(["/" + arr[1]]);
        }
    };

    componentDidMount() {
        const arr = this.props.history.location.pathname.split("/");
        RouterStore.onOpenChange(["/" + arr[1]]);
    }

    getRootSubMenuKeys() {
        let subMenuKeys = [];
        menus.map(menu => subMenuKeys.push(menu['key']));
        return subMenuKeys;
    }

    onOpenChange = (openKeys) => {

        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
            if (latestOpenKey === undefined) {
                this.setState({
                    openKeys: []
                })
            }
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
        console.log(openKeys, this.state.openKeys);
    };
    onSelect = ({item, key, selectedKeys}) => {
        console.log(item, key, selectedKeys);
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    trigger={null}
                    collapsible
                    className='self-layout-sider-left'
                    collapsed={this.state.collapsed}>

                    <div className="side-logo"/>
                    <MenuCom collapsed={this.state.collapsed}/>
                </Sider>
                <Layout>
                    {/*<Header  className='self-layout-header'>*/}
                        {/*<Icon*/}
                            {/*className="trigger-header"*/}
                            {/*type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                            {/*onClick={this.toggle}*/}
                        {/*/>*/}
                        {/*<Menu*/}
                            {/*className='menu-header'*/}
                            {/*onClick={this.handleClick}*/}
                            {/*selectedKeys={[this.state.current]}*/}
                            {/*style={{marginTop: '16px'}}*/}
                            {/*theme="dark"*/}
                            {/*mode="horizontal">*/}
                            {/*<SubMenu title={*/}
                                {/*<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"*/}
                                        {/*style={{background: '#fff'}}/>*/}
                            {/*}>*/}
                                {/*<MenuItemGroup title="Item 1">*/}
                                    {/*<Menu.Item key="setting:1">Option 1</Menu.Item>*/}
                                    {/*<Menu.Item key="setting:2">Option 2</Menu.Item>*/}
                                {/*</MenuItemGroup>*/}
                                {/*<MenuItemGroup title="Item 2">*/}
                                    {/*<Menu.Item key="setting:3">Option 3</Menu.Item>*/}
                                    {/*<Menu.Item key="setting:4">Option 4</Menu.Item>*/}
                                {/*</MenuItemGroup>*/}
                            {/*</SubMenu>*/}
                        {/*</Menu>*/}
                    {/*</Header>*/}
                    <Content style={{margin: '0 16px'}}>
                        <RouterCom/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}


@withRouter
@observer
class MenuCom extends Component {
    render() {
        return (
            <MenuUI
                selectedKeys={[this.props.history.location.pathname]}
                openKeys={RouterStore.openKeys}
                onOpenChange={RouterStore.onOpenChange}
                collapsed={this.props.collapsed}
                menus={menus}/>
        )
    }
}

const MenuUI = (props) => {
    const renderIcon = function (icon) {
        return icon ? <Icon type={icon}/> : null
    };
    const renderSubMenu = function (menus, path) {
        path = path || "";
        return menus.map(menu =>
            menu['subItems'] ?
                <SubMenu key={path + menu["key"]}
                         title={<span>{renderIcon(menu['icon'])}<span>{menu['title']}</span></span>}>
                    {renderSubMenu(menu['subItems'], path + menu['path'])}
                </SubMenu>
                :
                <Menu.Item key={path + menu["key"]}>
                    {menu['path'] ?
                        (<Link to={path + menu['path']}>
                            {renderIcon(menu['icon'])} {menu['title']}
                        </Link>) : <span>
                            {renderIcon(menu['icon'])} {menu['title']}
                        </span>}
                </Menu.Item>
        )
    };
    const renderMenu = function () {
        const menus = props['menus'];
        return renderSubMenu(menus);
    };
    return (
        <Menu
            mode="inline"

            selectedKeys={props.selectedKeys}
            openKeys={props.openKeys}
            onOpenChange={props.onOpenChange}
            inlineCollapsed={props.collapsed}
            theme="dark">
            {renderMenu()}
        </Menu>
    )
}
export default App;
