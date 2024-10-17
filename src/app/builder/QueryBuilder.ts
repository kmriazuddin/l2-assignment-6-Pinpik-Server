import { Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filterByTitle() {
    const { title } = this.query;
    if (typeof title === "string") {
      this.modelQuery = this.modelQuery.find({
        title: { $regex: new RegExp(title, "i") },
      });
    }
    return this;
  }

  sortByPopularity() {
    const { sortBy } = this.query;

    if (sortBy === "mostPopular") {
      this.modelQuery = this.modelQuery.sort({ upvotes: -1 });
    } else if (sortBy === "leastPopular") {
      this.modelQuery = this.modelQuery.sort({ downvotes: -1 });
    } else {
      this.modelQuery = this.modelQuery.sort({ upvotes: -1 });
    }

    return this;
  }

  paginate() {
    const { page = 1, limit = 3 } = this.query;

    const skip = (Number(page) - 1) * Number(limit);
    const postLimit = Number(limit);

    this.modelQuery = this.modelQuery.skip(skip).limit(postLimit);

    return this;
  }
}

export default QueryBuilder;
