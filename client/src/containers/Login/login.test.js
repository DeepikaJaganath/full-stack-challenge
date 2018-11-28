import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount } from 'enzyme'

import Login from './login';

describe('Test Cases for Login', () => {
    const wrapper = mount(<Login />);
        it('it renders login component', () => {
            expect(wrapper.find('.loginFormContainer')).toBeDefined();
        })

        it('has state defined', () => {
            expect(wrapper.state().isLogged).toBeDefined();
            expect(wrapper.state().isLogged).toEqual(false);
        })

        it('has register user method defined', () => {
            const componentInstance = wrapper.instance();
            expect(componentInstance.loginUser).toBeDefined();
        })

        it('has signup form fields', () => {
            expect(wrapper.find('input#email')).toBeDefined();
            expect(wrapper.find('input#password')).toBeDefined();
        })

        it('fills the form fields', () => {
            wrapper.find('input#email').simulate('change', {target: {value: 'abs@example.com'}});
            wrapper.find('input#password').simulate('change', {target: {value: 'abcD123@'}});
            expect(wrapper.find('input#email').props().value).toEqual('abs@example.com');
            expect(wrapper.find('input#password').props().value).toEqual('abcD123@');
        })
})