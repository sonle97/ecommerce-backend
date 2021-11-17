"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySortBy = void 0;
const paginationQuery = ({ query, searchBy, inputData, applySkipTake = true, }) => {
    if (inputData && inputData.q) {
        Object.entries(inputData.q).map(([key, value]) => {
            if (value && key in searchBy) {
                let whereCondition = '';
                if (typeof value === 'number') {
                    if (Array.isArray(searchBy[key])) {
                        const whereConditionArr = [];
                        searchBy[key].forEach(oneCondition => {
                            whereConditionArr.push(`${oneCondition} = :q${key}`);
                        });
                        whereCondition = `(${whereConditionArr.join(' OR ')})`;
                    }
                    else {
                        whereCondition = `${searchBy[key]} = :q${key}`;
                    }
                    query.andWhere(`${whereCondition}`, {
                        [`q${key}`]: `${value}`,
                    });
                }
                else {
                    if (Array.isArray(searchBy[key])) {
                        const whereConditionArr = [];
                        searchBy[key].forEach(oneCondition => {
                            whereConditionArr.push(`${oneCondition} LIKE :q${key}`);
                        });
                        whereCondition = `(${whereConditionArr.join(' OR ')})`;
                    }
                    else {
                        whereCondition = `${searchBy[key]} LIKE :q${key}`;
                    }
                    query.andWhere(`${whereCondition}`, {
                        [`q${key}`]: `%${value}%`,
                    });
                }
            }
        });
    }
    exports.applySortBy(query, inputData);
    applyLimit(query, inputData, applySkipTake);
    return query;
};
exports.applySortBy = (query, inputData) => {
    if (inputData && inputData.sortBy) {
        inputData.sortBy.split('|').forEach((sortBy) => {
            query.addOrderBy(sortBy, inputData.sortDesc ? 'DESC' : 'ASC');
        });
    }
};
const applyLimit = (query, inputData, applySkipTake = true) => {
    if (inputData && inputData.page && inputData.limit) {
        const skip = (inputData.page - 1) * inputData.limit;
        const take = inputData.limit;
        if (applySkipTake) {
            query.skip(skip);
            query.take(take);
        }
        else {
            query.offset(skip);
            query.limit(take);
        }
    }
};
exports.default = paginationQuery;
//# sourceMappingURL=paginationQuery.js.map