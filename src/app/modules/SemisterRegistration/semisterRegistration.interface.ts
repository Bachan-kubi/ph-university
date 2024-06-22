import { Types } from "mongoose";

export type TsemisterRegistration = {
    academicSemester: Types.ObjectId;
    status: "UPCOMING"| "ONGOING"| "ENDED";
    startedDate: Date;
    endedDate: Date;
    maxCredit: number;
    minCredit: number;
}