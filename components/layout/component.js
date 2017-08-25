import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { LocaleProvider, Layout as ALayout, Menu, Icon } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const { Footer, Sider, Content } = ALayout;
const { SubMenu } = Menu;

class Layout extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      title: PropTypes.string,
    };

    static defaultProps = {
      title: 'interface',
    };

    state = {
      collapsed: false,
    };

    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }

    render() {
      const { title, children } = this.props;
      return (
        <div>
          <Head>
            <title>{ title }</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.5/antd.min.css" />
          </Head>
          <LocaleProvider locale={enUS}>
            <ALayout style={{ height: '100vh' }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <h2 className="logo">
                  <Link href="/">
                    <a>
                      <img src="/static/non-existent.png" alt="logo" width="75" height="75" />
                    </a>
                  </Link>
                </h2>
                <Menu
                  theme="dark"
                  defaultOpenKeys={['sub1']}
                  defaultSelectedKeys={['sub1']}
                  mode="inline"
                >
                  <SubMenu
                    key="sub1"
                    title={<span><Icon type="user" /><span>User</span></span>}
                  >
                    <Menu.Item key="1"><Link href="/users"><a>List all users</a></Link></Menu.Item>
                    <Menu.Item key="2"><Link href="/user"><a>Create new user</a></Link></Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <ALayout>
                <Content style={{ margin: '0 16px', padding: 24, background: '#fff' }}>
                  { children }
                </Content>
                <Footer>&nbsp;</Footer>
              </ALayout>
            </ALayout>
          </LocaleProvider>
        </div>
      );
    }
}

export default Layout;
