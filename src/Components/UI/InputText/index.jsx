import { forwardRef } from "react";
import BoxInput from "./BoxInput";


const InputText = forwardRef(({   
    label,
    isValidError,
    errorText,
    ...props
    }, ref) => {
        return (
            <BoxInput>
                <label>
                    <span>{label}</span>
                    <input {...props} ref={ref}/>
                </label>  
                {isValidError && <h3>{errorText}</h3>}         
            </BoxInput>
        );
    });

export default InputText;

// isValidError={isValidError}