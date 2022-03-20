class GetLastId {
  async getID(collection) {
    let collectionName = require(`../schema/Schema.${collection}`);
    const Result = await collectionName.find({}).sort({ _id: -1 }).limit(-1);
    return Result[0];
  }
}

module.exports = GetLastId;
