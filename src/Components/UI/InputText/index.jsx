import { forwardRef } from "react";
import BoxInput from "./BoxInput";


const InputText = forwardRef(({   
    label,
    isValidError,
    errorText,
    ...props
    }, ref) => {
        return (
            <BoxInput isValidError={isValidError}>
                <label>
                    <span>{label}</span>
                    <input {...props} ref={ref}/>
                </label>  
                <h3>{errorText}</h3>          
            </BoxInput>
        );
    });

export default InputText;



// export default function InputText ({
//     label,
//     isValidError,
//     errorText,
//     ...props
// }) {
//     return (
//         <BoxInput isValidError={isValidError}>
//             <label>
//                 <span>{label}</span>
//                 <input {...props}/>
//             </label>  
//             <h3>{errorText}</h3>          
//         </BoxInput>
//     );
// };