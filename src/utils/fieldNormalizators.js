export const nameNor = value => {
  value = value.replace(/[^a-z]/i, '');
  value = value.slice(0, 20);
  return value && value[0].toUpperCase() + value.slice(1).toLowerCase();
}

export const phoneNumberNor = value => {
  let onlyNums = value.replace(/[^\d]/g, '');
  console.log(onlyNums);
  if(onlyNums.length < 1) return '';
  if(onlyNums.length < 3) return '+' + onlyNums;
  if(onlyNums.length < 6) return '+' + onlyNums.slice(0, 2) + '(' + onlyNums.slice(2);
  return `+${onlyNums.slice(0,2)}(${onlyNums.slice(2, 5)})${onlyNums.slice(5,12)}`;
}

