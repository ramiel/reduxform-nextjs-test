import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Icon, Input } from 'antd';
import Link from 'next/link';
import { filterUserListBy, unfilterUserList, searchUser } from '../../redux/actions/users';

class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    filterUserListBy: PropTypes.func.isRequired,
    unfilterUserList: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired,
  };

  state = {
    filterDropdownVisible: {
      username: false,
      name: false,
      nickname: false,
    },
    searchText: {
      username: '',
      name: '',
      nickname: '',
    },
    filtered: {
      username: false,
      name: false,
      nickname: false,
    },
  };

  onInputChange = (property) => (e) => {
    this.setState(
      {
        searchText: {
          ...this.state.searchText,
          [property]: e.target.value,
        },
        filtered: {
          ...this.state.filtered,
          [property]: e.target.value !== '',
        },
      },
    );
  }

  onSearch = () => {
    this.props.searchUser(this.state.searchText);
  }

  onEsc = (property) => (e) => {
    if (e.keyCode === 27) {
      this.setState({
        filterDropdownVisible: {
          ...this.state.filterDropdownVisible,
          [property]: false,
        },
        searchText: {
          ...this.state.searchText,
          [property]: '',
        },
      }, () => this.props.searchUser(this.state.searchText));
    }
  }

  onSearchCancel = (property) => (e) => {
    e.preventDefault();
    this.setState({
      filterDropdownVisible: {
        ...this.state.filterDropdownVisible,
        [property]: false,
      },
      searchText: {
        ...this.state.searchText,
        [property]: '',
      },
    }, () => this.props.searchUser(this.state.searchText));
  }


  render() {
    const { Column } = Table;
    return (
      <Table dataSource={this.props.users} rowKey="id">

        <Column
          title="Name"
          dataIndex="name"
          render={name => `${name.first || ''} ${name.last || ''}`}
          filterDropdown={(
            <div className="custom-filter-dropdown">
              <Input.Search
                ref={input => { this.nameSearchInput = input; }}
                // eslint-disable-next-line jsx-a11y/href-no-hash
                prefix={<a href="#" onClick={this.onSearchCancel('name')}><Icon type="close" /></a>}
                placeholder="Search by name"
                value={this.state.searchText.name}
                onChange={this.onInputChange('name')}
                onSearch={this.onSearch}
                onKeyDown={this.onEsc('name')}
              />
            </div>
          )}
          filterIcon={<Icon type="search" style={{ color: this.state.filtered.name ? '#108ee9' : '#aaa' }} />}
          filterDropdownVisible={this.state.filterDropdownVisible.name}
          onFilterDropdownVisibleChange={(visible) => {
            this.setState({
              filterDropdownVisible: {
                ...this.state.filterDropdownVisible,
                name: visible,
              },
            }, () => this.nameSearchInput.input.focus());
          }}
        />

        <Column
          title="Email"
          dataIndex="username"
          filterDropdown={(
            <div className="custom-filter-dropdown">
              <Input.Search
                ref={input => { this.usernameSearchInput = input; }}
                // eslint-disable-next-line jsx-a11y/href-no-hash
                prefix={<a href="#" onClick={this.onSearchCancel('username')}><Icon type="close" /></a>}
                placeholder="Search by email"
                value={this.state.searchText.username}
                onChange={this.onInputChange('username')}
                onSearch={this.onSearch}
                onKeyDown={this.onEsc('username')}
              />
            </div>
          )}
          filterIcon={<Icon type="search" style={{ color: this.state.filtered.username ? '#108ee9' : '#aaa' }} />}
          filterDropdownVisible={this.state.filterDropdownVisible.username}
          onFilterDropdownVisibleChange={(visible) => {
            this.setState({
              filterDropdownVisible: {
                ...this.state.filterDropdownVisible,
                username: visible,
              },
            }, () => this.usernameSearchInput.input.focus());
          }}
        />

        <Column
          title="Nickname"
          dataIndex="defaultNickname"
          filterDropdown={(
            <div className="custom-filter-dropdown">
              <Input.Search
                ref={input => { this.nicknameSearchInput = input; }}
                // eslint-disable-next-line jsx-a11y/href-no-hash
                prefix={<a href="#" onClick={this.onSearchCancel('nickname')}><Icon type="close" /></a>}
                placeholder="Search by nickname"
                value={this.state.searchText.nickname}
                onChange={this.onInputChange('nickname')}
                onSearch={this.onSearch}
                onKeyDown={this.onEsc('nickname')}
              />
            </div>
          )}
          filterIcon={<Icon type="search" style={{ color: this.state.filtered.nickname ? '#108ee9' : '#aaa' }} />}
          filterDropdownVisible={this.state.filterDropdownVisible.nickname}
          onFilterDropdownVisibleChange={(visible) => {
            this.setState({
              filterDropdownVisible: {
                ...this.state.filterDropdownVisible,
                nickname: visible,
              },
            }, () => this.nicknameSearchInput.input.focus());
          }}
        />

        <Column
          title="Registered"
          dataIndex="type"
          render={type => <Icon type={type === 'registered' ? 'check-circle-o' : 'close-circle-o'} />}
          filters={[{
            text: 'Registered',
            value: 'registered',
          }, {
            text: 'Unregistered',
            value: 'unregistered',
          }]}
          onFilter={(value, record) => record.type.indexOf(value) === 0}
        />

        <Column
          title="Actions"
          dataIndex="id"
          key="actions"
          render={id => (<Link href={`/user?id=${id}`}><a>Edit</a></Link>)}
        />

      </Table>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users: users.visibleList });

const mapDispatchToProps = {
  filterUserListBy,
  unfilterUserList,
  searchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
