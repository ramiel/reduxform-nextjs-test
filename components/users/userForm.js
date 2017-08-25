import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, Form as ReduxForm, actions as formActions } from 'react-redux-form';
import { Form, Icon, Input, Button } from 'antd';
import { fetchUser, saveUser } from '../../redux/actions/users';

const FormItem = Form.Item;

class UserForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    fetchUser: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    saveUser: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    isSaving: false,
  }


  componentDidMount() {
    this.loadForm(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.loadForm(nextProps.id);
    }
  }

  onSubmit = (user) => {
    this.setState({ isSaving: true });
    this.props.saveUser(user)
      .then(() => this.setState({ isSaving: false }));
  }

  loadForm(id) {
    if (id) {
      this.props.fetchUser(id)
        .then(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.props.formReset('user');
      this.setState({ isLoading: false });
    }
  }

  renderForm() {
    return (<ReduxForm
      model="user"
      component={Form}
      onSubmit={this.onSubmit}
    >
      <FormItem label="Id">
        <Control.text
          model=".id"
          component={Input}
          prefix={<Icon type="user" />}
          placeholder="user id"
          disabled
        />
      </FormItem>

      <FormItem label="Username">
        <Control.text
          model=".username"
          component={Input}
          prefix={<Icon type="user" />}
          placeholder="Username"
        />
      </FormItem>

      <FormItem label="First name">
        <Control.text
          model=".name.first"
          component={Input}
          prefix={<Icon type="user" />}
          placeholder="First Name"
        />
      </FormItem>

      <FormItem label="Last name">
        <Control.text
          model=".name.last"
          component={Input}
          prefix={<Icon type="user" />}
          placeholder="Last Name"
        />
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          loading={this.state.isSaving}
        >
          Save
        </Button>
      </FormItem>

      <FormItem>
        <Button
          onClick={() => {
            this.props.formReset('user');
          }}
        >
          Reset
        </Button>

      </FormItem>
    </ReduxForm>);
  }

  render() {
    return this.renderForm();
  }
}


const mapStateToProps = null;

const mapDispatchToProps = {
  fetchUser,
  saveUser,
  formReset: formActions.reset,

};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
