
import BoxInput from "./BoxInput";

export default function InputText ({
    label,
    isValidError,
    errorText,
    ...props
}) {
    return (
        <BoxInput isValidError={isValidError}>
            <label>
                <span>{label}</span>
                <input {...props}/>
            </label>  
            <h3>{errorText}</h3>          
        </BoxInput>
    );
};