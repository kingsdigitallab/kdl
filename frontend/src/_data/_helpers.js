const fs = require("fs/promises");
const https = require("https");

module.exports = {
  async loadData(
    directus,
    collection,
    fileName,
    fields,
    sort = "name",
    callback = null
  ) {
    return fs
      .readFile(`./src/_data/_${fileName}.json`)
      .then((data) => JSON.parse(data))
      .then((data) => Promise.resolve(data))
      .catch((err) => {
        console.warn(`${err.message}, using Directus instead`);

        return directus
          .items(collection)
          .readByQuery({ fields: fields, sort: sort, limit: -1 })
          .then((response) => response.data)
          .then((data) => (callback ? callback(data) : data))
          .then((data) => {
            fs.writeFile(
              `./src/_data/_${fileName}.json`,
              JSON.stringify(data, null, 2)
            );

            return Promise.resolve(data);
          })
          .catch((err) => console.error(err));
      });
  },
  async downloadImage(directus, image) {
    if (!image.id) {
      return Promise.resolve();
    }

    const fileUrl = `${directus.url}assets/${image.id}`;
    const filePath = `./public/assets/images/projects/${image.filename_download}`;

    return new Promise((resolve, reject) => {
      https.get(fileUrl, (response) => {
        let data = Buffer.from([]);

        response
          .on("data", (chunk) => {
            data = Buffer.concat([data, chunk]);
          })
          .on("end", () => {
            if (!data) {
              reject(new Error(`No data received for ${fileUrl}`));
            }
            fs.writeFile(filePath, data, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(filePath);
              }
            });
          })
          .on("error", (err) => {
            reject(err);
          });
      });
    });
  },
};
