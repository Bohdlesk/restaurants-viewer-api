function createPageLimits(params = {}) {
  const { page = null, perPage = 15 } = params;
  return page
    ? {
        limit: +perPage,
        offset: +perPage * (+page - 1),
      }
    : {};
}
module.exports = { createPageLimits };
