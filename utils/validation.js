export const isNameValid=(name)=>{
    const regex = /^[A-Za-z]{2,}$/;
    return regex.test
}
export const isEmailValid=(email)=>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const isPasswordValid =(password)=>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

export const isValidPhoneNumber=(phoneNumber) =>{
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
}

export const isUserNameValid = (userName)=>{
     const usernameRegex = /^[a-zA-Z0-9]+$/;
     return usernameRegex.test(userName)
}