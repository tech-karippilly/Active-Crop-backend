import { isEmailValid, isNameValid, isPasswordValid, isUserNameValid, isValidPhoneNumber, validatePrice, validateProductName, validateStockQuantity } from "./validation.js"

function isAdminLoginFormValid(email,password){

    const isEmail = isEmailValid(email)

    if (!isEmail){
        return false
    }
    return true
}

function isAdminSignupFormValid(firstName, lastName, userEmail, password, userName, phone, confirmPassword) {
    const errors = [];
    
    if (!isEmailValid(userEmail)) {
        errors.push("Invalid email format.");
    }

    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }
    if (!isNameValid(firstName)) {
        errors.push("First name is invalid (only letters allowed).");
    }
    if (!isNameValid(lastName)) {
        errors.push("Last name is invalid (only letters allowed).");
    }
    if (!isUserNameValid(userName)) {
        errors.push("Username is invalid (only letters and numbers allowed).");
    }
    if (!isValidPhoneNumber(phone)) {
        errors.push("Phone number must be 10 digits and contain no special characters.");
    }

    return errors.length > 0 ? errors : null; 
}

function isUserLoginFormValid(userName){
    const isUserName =isUserNameValid(userName)
    return isUserName
}

function productFormValid(product_name, price, stock_quantity) {
    const errors = {};

    if (!validateProductName(product_name)) {
        errors.product_name = "Invalid product name! (2-50 characters, no special symbols)";
    }

    if (!validatePrice(price)) {
        errors.price = "Invalid price! (Only numbers, max 2 decimal places)";
    }

    if (!validateStockQuantity(stock_quantity)) {
        errors.stock_quantity = "Invalid stock quantity! (Only whole numbers, 1-7 digits)";
    }

    return Object.keys(errors).length === 0 ? true : errors;
}


export{
    isAdminLoginFormValid,
    isAdminSignupFormValid,
    isUserLoginFormValid,
    productFormValid
}