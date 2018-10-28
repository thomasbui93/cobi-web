import * as React from 'react'
import { FilterToggle } from './FilterToggle'
import { mount } from 'enzyme'
import { FilterOptionItem } from './FilterOptionItem'

describe('FilterToggle interaction', () => {
  const mockOnchange = (label: string, value: '') => true
  const props = {
    initialValue: 'value_1',
    label: 'Filter Label',
    name: 'Filter Name',
    options: [{
      label: 'Option 1',
      value: 'value_1'
    }, {
      label: 'Option 1',
      value: 'value_2'
    }],
    onChange: mockOnchange
  }
  it('should call onChange with correct value when click on option', () => {
    const mock = jest.fn()
    const mockOption = {
      ...props,
      onChange: (label: string, value: string) => mock(label, value)
    }
    const filter = mount(<FilterToggle {...mockOption}/>)
    const option = filter.find(FilterOptionItem).first()
    option.simulate('click')
    expect(mock).toHaveBeenCalledWith('Filter Name', 'value_1')
    option.simulate('click')
    expect(mock).toHaveBeenCalledWith('Filter Name', '')
  })
})