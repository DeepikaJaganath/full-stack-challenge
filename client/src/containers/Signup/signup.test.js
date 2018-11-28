import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Signup from './signup';
configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount } from 'enzyme'

describe('Test Cases for Registration', () => {
    const wrapper = mount(<Signup />);
        it('it renders signup component', () => {
            expect(wrapper.find('.signupContainer')).toBeDefined();
        })

        it('has state defined', () => {
            expect(wrapper.state().showModal).toBeDefined();
            expect(wrapper.state().showModal).toEqual(false);
        })

        it('has register user method defined', () => {
            const componentInstance = wrapper.instance();
            expect(componentInstance.registerUser).toBeDefined();
        })

        it('has signup form fields', () => {
            expect(wrapper.find('input#email')).toBeDefined();
            expect(wrapper.find('input#password')).toBeDefined();
            expect(wrapper.find('input#confirmPassword')).toBeDefined();
        })

        it('fills the form fields', () => {
            wrapper.find('input#email').simulate('change', {target: {value: 'abs@example.com'}});
            wrapper.find('input#password').simulate('change', {target: {value: 'abcD123@'}});
            wrapper.find('input#confirmPassword').simulate('change', {target: {value: 'abcD123@'}});
            expect(wrapper.find('input#email').props().value).toEqual('abs@example.com');
            expect(wrapper.find('input#password').props().value).toEqual('abcD123@');
            expect(wrapper.find('input#confirmPassword').props().value).toEqual('abcD123@');
        })
})
