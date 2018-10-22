const commonState = {
  request: 'REQUEST',
  error: 'ERROR',
  done: 'DONE',
}

export const getRequestAction = (prefix: string) => `${prefix} + ${commonState.request}`
export const getErrorAction = (prefix: string) => `${prefix} + ${commonState.error}`
export const getDoneAction= (prefix: string) => `${prefix} + ${commonState.done}`