import React, {Component} from "react";
import BreadcrumbCom from "./BreadcrumbCom"
import {Skeleton, Switch, Card, Icon, Avatar} from 'antd';
import PropTypes from 'prop-types';
import AddOn from "./AddOn"
import AppLayout from "./AppLayout"

const {Meta} = Card;
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      themeColor: 'red',
      subTitle: {
        config: {
          abc: 1111
        }
      },
    }
  }

  changeSubTitle = () => {
    this.setState({
      subTitle: {
        config: {
          abc: 1234562222
        }
      }
    })
  }
  static childContextTypes = {
    themeColor: PropTypes.string,
    subTitle: PropTypes.object,
    changeSubTitle: PropTypes.func
  }

  getChildContext() {
    return {themeColor: this.state.themeColor, subTitle: this.state.subTitle, changeSubTitle: this.changeSubTitle}
  }

  onChange = (checked) => {
    this.setState({loading: !checked});
  }

  render() {
    const {loading} = this.state;
    return (
      <div className='page-content'>
        <BreadcrumbCom/>
        <Title/>
        <SubTitle/>
        <App/>
        <div>
          AppLayout
        </div>
        <AppLayout name="AppLayout">
          <AddOn slot="header">
            <h1>这里可能是一个页面标题</h1>
          </AddOn>
          <AddOn>
            <p>主要内容的一个段落。</p>
            <p>另一个段落。</p>
          </AddOn>
          <AddOn slot="footer">
            <p>这里有一些联系信息</p>
          </AddOn>
        </AppLayout>
        <button onClick={() => this.setState({
          themeColor: this.state.themeColor === 'green' ? ' red ' : 'green'
        })}>点击更换颜色
        </button>
        <div className='page-section'>
          <Switch checked={!loading} onChange={this.onChange}/>

          <Card style={{width: 300, marginTop: 16}} loading={loading}>
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
              title="Card title"
              description="This is the description"
            />
          </Card>

          <Card
            style={{width: 300, marginTop: 16}}
            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
          </Card>
        </div>
      </div>
    )
  }
}

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }

  render() {
    return (
      <h1 style={{color: this.context.themeColor}}>标题
        <SubTitle/>
      </h1>
    )
  }
}

class SubTitle extends Component {
  static contextTypes = {
    subTitle: PropTypes.object,
    themeColor: PropTypes.string,
    changeSubTitle: PropTypes.func
  }

  render() {
    console.log(this.context)
    return (
      <div>
        <span style={{color: this.context.themeColor}}>{this.context.subTitle.config.abc}</span>
        <button onClick={this.context.changeSubTitle}>
          更换二级标题
        </button>
      </div>
    )
  }
}

const ThemeContext = React.createContext({
  background: 'red',
  color: 'white'
});

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
        <Header/>
        <Title2>我是Title2</Title2>
      </ThemeContext.Provider>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <Title3>Hello React Context API</Title3>
    );
  }
}

class Title3 extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{background: context.background, color: context.color}}>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class Title2 extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{background: context.background, color: context.color}}>
            {this.props.children}
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}

