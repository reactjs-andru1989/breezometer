import React from 'react';
import {shallow} from 'enzyme';
import App from '../src/App';
import Search from '../src/Search';

const search        = shallow(<Search />);
const input         = search.find('input');
const button        = search.find('button');
const searchString  = 'Londres'

it('Initialy search button is disabled', () => {
  expect(button.node.props.disabled).toBe(true)
});

it('Enable search button when input is filled', () => {
  expect(button.node.props.disabled).toBe(true)
  input.simulate('change', {target: {value: searchString}});
  expect(search.find('button').node.props.disabled).toBe(false)
});