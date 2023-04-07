export default function passwordValidator (str) {
    if (/^(?=.*[0-9])[a-zA-Z0-9]{8,16}$/.test(str)){
       return true;
    }
    return false;
}