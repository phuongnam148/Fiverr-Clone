const createError = (status, massage) =>{
    const err = new Error()
    err.status = status;
    err.message = massage;

    return err
}

export default createError;