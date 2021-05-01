export const requiredFields = value => {
    return value ? undefined: 'Field is required !';
};

export const maxLengthCreator = (max_length) => (value) => {
    return value && value.length <= max_length? undefined: `Max length is ${max_length}`;
};

export const maxLengthOrNothingCreator = (max_length) => (value) => {
    return !value || value.length <= max_length? undefined: `Max length is ${max_length}`;
};

export const minLengthCreator = (min_length) => (value) => {
    return value && value.length >= min_length? undefined: `Min length is ${min_length}`;
};

export const minLengthOrNothingCreator = (min_length) => (value) => {
    return !value || value.length >= min_length? undefined: `Min length is ${min_length}`;
};


export const emailValidate = (address) => {
   let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   return reg.test(address)? undefined: 'Enter correct email address';
}
export const phoneNumberValidate = phone => {
    let reg = /^(0|[1-9][0-9]{9})$/i;
    return reg.test(phone) ? undefined: 'Enter correct phone number';
}
export const onlyLetters = value => {
    let reg = /^\s*[a-z]*\s*$/i;
        return reg.test(value) ? undefined: 'Fields must been equals english letters only';
}
export const matchPasswords = (password, all_values) => {
  return password === all_values.password? undefined: 'Enter passwords is no match';
}
export const complexPassword = value => { 
  let regs = [
    /[a-z]/,
    /[A-Z]/,
    /\d/,
  ];
  let test = regs.reduce((result, reg) => {
    return result && reg.test(value);
  }, true);

  return test? undefined: 'Password must include numbers and letters in uppercase and lowercase';
}

export const onlyDigit = value => {
  return /^\d*$/.test(value)? undefined: 'Fields must been equals digits only';
}


