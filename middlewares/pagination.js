const MyModel = require("../models/contactSchema");
const { tryCatch } = require("../validation.helps/helpers");

const pagination = tryCatch(async (req, res, next) => {
  const { favorite, page, limit } = req.query;

  const data = await MyModel.find({ owner: req.user.id }).select("-owner");
  if (Object.keys(req.query).length === 0) {
    req.body = data;
    next();
  }

  if (favorite) {
    const filterContact = data.filter((item) => item.favorite === true);
    req.body = filterContact;
    next();
  }

  if (page > 0 || limit > 0) {
    const paginationPage = +page || 1;
    const paginationlimit = +limit || 1;
    const skip = (paginationPage - 1) * paginationlimit;

    const data = await MyModel.find({ owner: req.user.id })
      .select("-owner")
      .skip(skip)
      .limit(paginationlimit);

    req.body = data;
    next();
  }
});
module.exports = { pagination };
