import {stringify, parse} from 'query-string'
import { InputValueType } from '../../modules/search/components/filters/InterfaceFilterState';

export function updateQuery(queryData: any): string {
  return `?${stringify(queryData)}`
}

export function getArrayOfQuery(search: string): InputValueType[] {
  const searchObject = parse(search)
  if (typeof searchObject === 'undefined' || !searchObject) {
    return []
  }
  const returnValue: InputValueType[] = []
  Object.keys(searchObject).forEach(key => {
    returnValue[key] = searchObject[key]
  })
  return returnValue
} 