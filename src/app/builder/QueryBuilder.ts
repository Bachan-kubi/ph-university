
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // search method
    search(searchingItems: string[]) {
        const searchTerm = this?.query?.searchTerm
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchingItems.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" }
                }) as FilterQuery<T>)
            });
        }
        return this;
    }
    // filter 
    filter() {
        const queryObj = { ...this.query }; // copy from query
        const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeField.forEach((ele) => delete queryObj[ele]);
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }
    // sort
    sort(){
        const sort = this?.query?.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }
    paginate(){
        // const page = Number(this?.query?.page) || 1;
        // const limit = Number(this?.query?.limit) || 1;
        const page = Number(this?.query?.page);
        const limit = Number(this?.query?.limit);
        const skip = (page-1)*limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields(){
        const fields = (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
};

export default QueryBuilder;