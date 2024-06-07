import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleZodError = (err: ZodError): TGenericErrorResponse=>{
    const statusCode = 400;
    const errorSources:TErrorSources= err.issues.map((error)=>{
      return {
        path: error?.path[error.path.length-1],
        message: error.message
      }
    })
    return{
      statusCode,
      message: "Zod Validation Error!!",
      errorSources
    }
  }

  export default handleZodError;