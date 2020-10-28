export const updateObject = (oldObject, updatedPropperties) => {
    return {
        ...oldObject,
        ...updatedPropperties
    }
}