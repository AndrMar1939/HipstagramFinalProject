export default function loginNameValidator (str) {
    if (/^[a-zA-Z0-9]{2,30}$/.test(str)){
       return true;
    }
    return false;
}