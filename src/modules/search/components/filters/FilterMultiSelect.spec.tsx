import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FilterMultiSelect } from './FilterMultiSelect'
import { mount } from 'enzyme'
import { FilterOptionItem } from './FilterOptionItem'


describe('FilterMultiSelect constructor', () => {
  const mockOnchange = (label: string, value: '') => true
  const props = {
    initialValue: '',
    label: 'Filter Label',
    name: 'Filter Name',
    options: [{
      label: 'Option 1',
      value: 'value_1'
    }],
    onChange: mockOnchange
  }

  it('render correctly', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <FilterMultiSelect {...props}/>,
      div
    )
  })

  it('should not render empty block if options are empty', () => {
    const emptyOptions = {
      ...props,
      ...{
        options: []
      }
    }
    const filter = mount(<FilterMultiSelect {...emptyOptions}/>)
    expect(filter.text()).toBe('')
  })

  it('should not render block if options are not empty', () => {
    const filter = mount(<FilterMultiSelect {...props}/>)
    expect(filter.text()).not.toBe('')
    expect(filter.find(FilterOptionItem).length).toBe(1)
    const currentValueState: string[]= filter.state('currentValue')
    expect(currentValueState).toBeInstanceOf(Array)
    expect(currentValueState.length).toBe(0)
  })
})

describe('FilterMultiSelect interaction', () => {
  const mockOnchange = (label: string, value: '') => true
  const props = {
    initialValue: '',
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
  it('should toggle openState when click to title', () => {
    const filter = mount(<FilterMultiSelect {...props}/>)
    filter.find('.filter__title').simulate('click')
    expect(filter.state('isOpen')).toBe(false)
  })
  it('should call onChange with correct value when clic on option', () => {
    const mock = jest.fn()
    const mockOption = {
      ...props,
      onChange: (label: string, value: '') => mock(label, value)
    }
    const filter = mount(<FilterMultiSelect {...mockOption}/>)
    const option = filter.find(FilterOptionItem).first()
    option.simulate('click')
    expect(mock).toHaveBeenCalledWith('Filter Name', 'value_1')
  })
})