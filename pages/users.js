import React from 'react';
import withRedux from 'next-redux-wrapper';
import Layout from '../components/layout';
import initStore from '../redux/store';
import { fetchUsers } from '../redux/actions/users';
import UserList from '../components/users/userList';

export class Users extends React.Component {
  static async getInitialProps({ store }) {
    return store.dispatch(fetchUsers());
  }

  render() {
    return (<Layout>
      <UserList />
    </Layout>);
  }
}

export default withRedux(initStore)(Users);
