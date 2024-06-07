import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const handleMongooseErrors = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })

    const statusCode = 400;
    // const he = 'nai'

    return {
        statusCode,
        message: ' mongoose Validation Error',
        errorSources,
      };
}

export default handleMongooseErrors;