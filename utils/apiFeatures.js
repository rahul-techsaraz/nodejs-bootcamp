class APIFeatures{
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString; 
    }

    filter() {
         // 1) Filter the result if params are present in db
        const queryObj = { ...this.queryString };
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(element => delete queryObj[element]);
        
        // 2) Advanced Filitering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
         if (this.queryString.sort) {
            const sortyBy = this.queryString.sort.split(",").join(" ")
            //price name duration
            this.query = this.query.sort(sortyBy)
        } else {
            this.query = this.query.sort('createdAt');
        }
        return this;
    }

    limitFields() {
        //FIELDS LIMITING
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            //price name duration

            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }

        return this;
    }
    pagination() {
         // Pagination
        //page=2&limit=5, 1-5 page1, 6-10 page2,....
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page -1) * limit
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
module.exports = APIFeatures;