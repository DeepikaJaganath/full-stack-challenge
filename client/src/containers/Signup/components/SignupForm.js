import React, { Component } from 'react';
import PropTypes from 'prop-types';
import btoa from 'btoa';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            values = {email: values.email, password: btoa(values.password)}
            this.props.submitForm(values);
          }
        });
      }

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        let regex = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/);
        if(value && value.length < 6) {
            callback('Password length must be of atleast 6 characters');
        }
        else if(value && !regex.test(value)) {
            callback('Password must contain alphanumeric values');
        }
        else if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 8 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 12 },
              sm: { span: 12 },
            },
          };

        return(
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                        required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                        required: true, message: 'Please input your password!'
                        }, {
                        validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirmPassword', {
                        rules: [{
                        required: true, message: 'Please confirm your password!',
                        }, {
                        validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }}
                 >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        )
    }

}

SignupForm.propTypes = {
    submitForm: PropTypes.func
};
export default Form.create()(SignupForm);