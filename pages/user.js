import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/store';
import Layout from '../components/layout';
import UserForm from '../components/users/userForm';

export class User extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  }

  static async getInitialProps({ query }) {
    return {
      id: query.id,
    };
  }

  render() {
    return (<Layout>
      <UserForm id={this.props.id} />
    </Layout>);
  }
}

export default withRedux(initStore)(User);
