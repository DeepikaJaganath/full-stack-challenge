import React, { Component } from 'react';
import PropTypes from 'prop-types';
import btoa from 'btoa';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              values = {...values, password: btoa(values.password)}
            this.props.submitForm(values);
          }
        });
      }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 7 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 15 },
              sm: { span: 15 },
            },
          };

        return(
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem
                {...formItemLayout}
                label="E-mail">
                {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input placeholder="Email" />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="Password">
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input type="password" placeholder="Password" />
                )}
                </FormItem>
                <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </FormItem>
      </Form>
        )
    }
}

LoginForm.propTypes = {
    submitForm: PropTypes.func
};

export default Form.create()(LoginForm);