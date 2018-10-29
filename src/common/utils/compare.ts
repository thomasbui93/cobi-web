export const isAssociateArrayEqual = (arrayA: any[], arrayB: any[]): boolean => {
  const arrayAKeys = Object.keys(arrayA)
  if (arrayAKeys.length !== Object.keys(arrayB).length) {
    return false;
  }
  let isEqual = true;
  if (arrayAKeys.length === 0) {
    return Object.keys(arrayB).length === 0;
  }
  arrayAKeys.forEach((key: string) => {
    isEqual = (arrayA[key].toString() === arrayB[key].toString()) && isEqual
  })

  return isEqual;
}