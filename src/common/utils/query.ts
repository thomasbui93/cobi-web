import * as queryString from 'query-string'

export const updateQuery = (location: string, queryData: any): string => {
  const {url} = queryString.parseUrl(location)
  return `${url}?${queryString.stringify(queryData)}`
}