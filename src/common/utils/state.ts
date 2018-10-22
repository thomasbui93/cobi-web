export function composeErrorState(state: any) {
  return {
      ...state,
      isLoading: false,
      error: true
  }
}

export function composeLoadingState(state: any) {
  return {
      ...state,
      isLoading: true,
      error: false
  }
}