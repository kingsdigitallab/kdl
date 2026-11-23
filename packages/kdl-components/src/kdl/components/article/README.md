# Article

For use with blog posts, news, or any other article based content.

## Data

| Name                | Type   | Description                                     |
| ------------------- | ------ | ----------------------------------------------- |
| title               | string | Article title.                                  |
| feature.image       | string | Feature image path.                             |
| feature.description | string | Feature image description.                      |
| collections.people  | array  | Array of [person](../person/README.me) objects. |
| authors             | array  | Array of person identifiers.                    |
| date                | date   | Article date.                                   |

### Options

| Name         | Type   | Description                                       |
| ------------ | ------ | ------------------------------------------------- |
| class        | string | Class name for the `article` element.             |
| addLink      | bool   | Add link to article.                              |
| contentField | string | Field to get content from, defaults to `content`. |
