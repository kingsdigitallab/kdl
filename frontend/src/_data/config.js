const baseUrl = "/";
const paths = {
  assets: `${baseUrl}assets`,
  images: `${baseUrl}assets/images`,
  placeholderImage: `${baseUrl}assets/images/general/placeholder-blur2.jpg`,
  stylesheets: `${baseUrl}assets/stylesheets`,
};

module.exports = {
  baseUrl: baseUrl,
  title: "King's Digital Lab",
  description:
    "King’s Digital Lab (KDL) is a Research Software Engineering (RSE) team in King’s College London",
  url: "https://kdl.kcl.ac.uk",
  author: "King's Digital Lab",
  twitter: "kingsdigitallab",
  feature: {
    image: `${paths.images}/kings-logo-red.svg`,
    description: "King's College London logo in red",
  },
  // SEO plugin options
  options: {
    titleDivider: "|",
    imageWithBaseUrl: true,
  },
  paths: { ...paths },
};
