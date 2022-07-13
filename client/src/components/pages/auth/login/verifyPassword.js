/**
 * "Atleast 8 Characters", 
                        "A Lowercase Letter", 
                        "An Uppercase Letter", 
                        "A Number", 
                        "A Symbol (@, !, $, etc)"
 */

const checkLength = (password) => {
    if(password.length < 8) {
        return false;
    }
    return true;
}

const checkLowerCase = (password) => {
    return password.toUpperCase() !== password;
}

const checkUpperCase = (password) => {
    return password.toLowerCase() !== password;
}

const checkNumbers = (password) => {
    const regex = /\d/g;
    return regex.test(password);
}

const checkSymbols = (password) => {
    const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(password);
}

export { checkLength, checkLowerCase, checkUpperCase, checkNumbers, checkSymbols }
