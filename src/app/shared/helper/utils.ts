export const filterValidObjAttribute = (obj: any): any => {
  // Filter "object attribute" which container value
  const qp: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (obj[key]) {
      qp[key] = value;
    }
  }
  return qp;
};
