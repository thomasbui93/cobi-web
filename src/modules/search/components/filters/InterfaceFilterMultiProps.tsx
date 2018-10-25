import { InterfaceFilterOption } from './InterfaceFilterOption'

export interface InterfaceFilterMultiProps {
  initialValue: string,
  label: string,
  name: string,
  options: InterfaceFilterOption[],
  onChange: (label: string, changedValue: any) => any
}