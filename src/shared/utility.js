export const updateObject = (oldObject, updatedPropperties) => {
    return {
        ...oldObject,
        ...updatedPropperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = false;

    if (rules && rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
}