export const isEqualObject = (a, b): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => a[key] === b[key])
  );
};

export const isEqualSizeObject = (a, b): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return Object.keys(a).length === Object.keys(b).length;
};

/**
 * object의 value접근을 .을 이용해 나타낸 key 문자열을 deepKey라고 칭한다.
 * deepKey가 key인 하나의 record를 의도한 올바른 object형태로 바꿔주는 역할
 *
 *  ex) 'order.paidAtBetween' : ['2021-08-13', '2021-08-15']
 *  => dotToObject('order.paidAtBetween', ['2021-08-13', '2021-08-15'])
 *  => {order: {paidAtBetween: ['2021-08-13', '2021-08-15']}}
 * */

export const parseRecordWithDeepKey = (
  key: string,
  value: unknown,
): Record<string, unknown> => {
  if (!key) {
    return {};
  }
  const isDeepKey = key.includes('.');
  if (!isDeepKey) {
    return {[key]: value};
  }

  const keyStrList = key.split('.').reverse();
  return keyStrList.slice(1).reduce(
    (acc, curr) => ({
      [curr]: acc,
    }),
    {[keyStrList[0]]: value},
  );
};
