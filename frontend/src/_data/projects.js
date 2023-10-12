const helpers = require("./_helpers");

module.exports = async ({ directus }) => {
  return helpers.loadData(
    directus,
    "project",
    "projects",
    ["*.*.*.*.*"],
    "name",
    (data) => {
      data
        .filter((project) => project.image)
        .forEach(async (project) => {
          helpers
            .downloadImage(directus, project.image)
            .then((path) => {
              console.log(
                `Downloaded image for project ${project.name} into ${path}`
              );
            })
            .catch((err) => {
              console.error(
                `Error downloading image for project ${project.name}`,
                err
              );
            });
        });

      return data;
    }
  );
};
