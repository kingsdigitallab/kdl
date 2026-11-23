# Navigation

These components are based on https://a11y-style-guide.com/style-guide/section-navigation.html.

## Basic

### Data

| Name       | Type   | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| title      | string | The navigation title.                            |
| items      | array  | Navigation items.                                |
| currentUrl | string | URL of the current page, used for active status. |

### Options

| Name        | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| class       | string  | Class name for the `nav` element.                        |
| activeClass | string  | Class names for active item, default is `active`.        |
| nested      | boolean | If true render children, otherwise only top level items. |
| ordered     | boolean | If true use ol, otherwise ul.                            |

## Breadcrumbs

### Data

| Name  | Type  | Description       |
| ----- | ----- | ----------------- |
| items | array | Navigation items. |

### Options

| Name  | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| class | string | Class name for the `nav` element. |

## Pagination

### Data

| Name       | Type   | Description              |
| ---------- | ------ | ------------------------ |
| pagination | object | Pagination object.       |
| currentUrl | string | URL of the current page. |

### Options

| Name  | Type   | Description                       |
| ----- | ------ | --------------------------------- |
| class | string | Class name for the `nav` element. |
