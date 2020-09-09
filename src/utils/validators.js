export const requiredFields = value => {
    return value ? undefined: 'Field is required !';
};

export const maxLengthCreator = (max_length) => (value) => {
    return value && value.length <= max_length? undefined: `Max length is ${max_length}`;
};

export const minLengthCreator = (min_length) => (value) => {
    return value && value.length >= min_length? undefined: `Min length is ${min_length}`;
};

export const minLengthOrNothingCreator = (min_length) => (value) => {
    return !value || value.length >= min_length? undefined: `Min length is ${min_length}`;
};

export const matchPasswords = (password, all_values) => {
    return password === all_values.password? undefined: 'Enter passwords is no match';
}

export const emailValidate = (address) => {
   let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   return reg.test(address)? undefined: 'Enter correct email address';
}

export const phoneNumberValidate = phone => {
    let phoneno = /^\(?([0-9]{12})\)$/;
    return !phone || 1? undefined: 'Enter corrrect phone number';
}


export const onlyLetters = value => {
    let reg = /\W/;
        return !value.match(reg) ? undefined: 'Fields must been equals english letters only';
}
