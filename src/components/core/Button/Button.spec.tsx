import * as React from 'react'
import { shallow } from 'enzyme'

import { Button } from './Button'

describe('Button', () => {
  const testCases = [
    [
      {
        type: 'button',
        disabled: false,
        className: 'button button--primary'
      },
      {
        type: 'button',
        disabled: false,
        className: 'button button--primary'
      }
    ],
    [
      {
        type: 'submit',
        disabled: false,
        className: 'button button--primary'
      },
      {
        type: 'submit',
        disabled: false,
        className: 'button button--primary'
      }
    ],
    [
      {
        type: 'submit',
        disabled: true,
        className: 'button button--primary'
      },
      {
        type: 'submit',
        disabled: true,
        className: 'button button--primary'
      }
    ]
  ]
  function testSuite() {
    const input = arguments[0][0]
    const output = arguments[0][1]
    it('should render successfully with suffient data', () => {
      const button = shallow(<Button {...input}><span>Sample</span></Button>)
      const props = button.find('button').props()
      expect(props).toMatchObject(output)
    })
  }
  testCases.map(testSuite)
})