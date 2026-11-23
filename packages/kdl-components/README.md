# kdl-components

## Set up

Install this package:

`npm install --save-dev git+https://github.com/kingsdigitallab/kdl-components.git`

Install [nunjucks](https://mozilla.github.io/nunjucks/) if not available in the project:

`npm install --save-dev nunjucks`

Configure `nunjucks`:

```javascript
const kdlFilters = require("kdl-components/src/kdl/filters");
const Nunjucks = require("nunjucks");

const kdlComponentsPath = "../node_modules/kdl-components/src";

const nunjucksEnvironment = new Nunjucks.Environment([
  // kdl components path
  new Nunjucks.FileSystemLoader(kdlComponentsPath),
  // project specific includes
  new Nunjucks.FileSystemLoader("./src/_includes"),
]);
```

### 11ty

Add configuration to `.eleventy.js`:

```javascript
module.exports = (eleventyConfig) => {
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  // rebuild the project if the components change
  eleventyConfig.addWatchTarget(kdlComponentsPath);

  // to add kdl-components default assets add a passthrough copy
  eleventyConfig.addPassthroughCopy({
    [`${kdlComponentsPath}/kdl/assets`]: "/assets",
    # project specific passthrough
    public: "/",
  });

  // kdl components filters
  eleventyConfig.addFilter("toLocaleDate", kdlFilters.toLocaleDate);
  eleventyConfig.addFilter("filter", kdlFilters.filter);

  // rest of 11ty configuration
}
```

Add `obj` to `_data/eleventyComputed.js`:

```javascript
module.exports = {
  obj: (data) => data,
  ...
};

```

## Templates

This package has a [base template](src/kdl/base.njk) that can be extended in project
templates:

`{% extends "kdl/base.njk" %}`

## Components

Each component is implemented using a combination of macros and templates. The macros
take at most two objects as arguments, the first object is the data for the component,
the second, optional, object rendering options.

For details about the individual components see their documentation:

- [article](src/kdl/components/article)
- [header](src/kdl/components/header)
- [image](src/kdl/components/image)
- [link](src/kdl/components/link)
- [navigation](src/kdl/components/nav)
- [person](src/kdl/components/person)
- [time](src/kdl/components/time)
- [utils](src/kdl/components/utils)
