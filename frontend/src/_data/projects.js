const helpers = require("./_helpers");

module.exports = async ({ directus }) => {
  return helpers.loadData(
    directus,
    "project",
    "projects",
    [
      "alternateName",
      "cmsStatus",
      "description",
      "dissolutionDate",
      "foundingDate",
      "id",
      "name",
      "slug",
      "creativeWorkStatus",
      "creativeWorkStatus.name",
      "creativeWorkStatus.inDefinedTermSet.name",
      "image.*",
      "funder.agent_id.alternateName",
      "funder.agent_id.id",
      "funder.agent_id.name",
      "funder.agent_id.slug",
      "keywords.definedterm_id.name",
      "url.linkrole_id.name",
      "url.linkrole_id.url",
      "department.organisation_id.agent.alternateName",
      "department.organisation_id.agent.id",
      "department.organisation_id.agent.name",
      "department.organisation_id.agent.slug",
      "department.organisation_id.parentOrganisation.agent.alternateName",
      "department.organisation_id.parentOrganisation.agent.id",
      "department.organisation_id.parentOrganisation.agent.name",
      "department.organisation_id.parentOrganisation.agent.slug",
      "member.agent.alternativeName",
      "member.agent.id",
      "member.agent.name",
      "member.agent.slug",
      "member.roleName.name",
      "member.roleName.inDefinedTermSet.name",
    ],
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
