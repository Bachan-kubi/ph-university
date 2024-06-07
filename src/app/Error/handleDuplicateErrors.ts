import { TErrorSources } from "../interface/error";

const handleDuplicateErrors = (err: any)=>{
    const match = err.message.match(/"([^"]*)"/);
    const extractedMsg = match && match[1]
    const errorSources:TErrorSources = [
        {
            path: "",
            message: extractedMsg?`${extractedMsg} is already exist!`: "Duplicate key error!"
        }
    ]
    const statusCode = 400;
    return {
        statusCode,
        message:  "Duplicate ID",
        errorSources
    }
}

export default handleDuplicateErrors;