const { DateTime } = require("luxon");
const md = require("markdown-it")();
const _ = require("lodash");

function toLocaleDate(dateObj) {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
}

function filter(collection, values, path) {
  if (!(values instanceof Array)) {
    values = [values];
  }

  return collection.filter((entry) =>
    values.some((item) => item === _.get(entry, path))
  );
}

function renderMd(string) {
  if (!string) {
    return "";
  }

  return md.render(string);
}

module.exports = {
  toLocaleDate,
  filter,
  renderMd,
};
