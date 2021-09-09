# TO00BL10-3009

This is a `git` repository for the course Dynamic Web Applications with Javascript (with course code: `TO00BL10-3009` at Laurea).

## Author

This application is written by Richard Zilahi (LaureaID: `2108162`).

## Production `URL`

The productino application can be reached via [this](https://zilahir-todo.netlify.app/) link.

## Github

Since this `README` is uploaded elsewhere, the repository of the application can be found [here](https://github.com/zilahir/TO00BL10-3009)

# Roadmap of implementation

- [x] create git repo on github
- [x] setup the project (webpack, linters, skeleton of the application, scss)
- [x] create deployment process (`Github Actions` and `Netlify`)
- [x] implementation basic functionalities
- [x] deploy first version

# Documentation

This is a very simple todo application writtren in `vanilla JS`. No framework used, and taking advantages of the ES6, and ES7 features. There's no additional framework used.

In this project I am using both `classes` and `id` attributes on `HTMLElements`. The reason for this, is styling elements using `id`s is bad practive, so I am only using `id`s for `DOM` maniuplating, while using `classes` for styling. Accessing the `DOM` happens with the `id`s.

The skeleton of the `HTML` is described within the `index.html`, the rest of the `DOM` is built pragmatically using `javascript`.

## Features

Below listed the required features of the application set by the course this was made for.

### Minimal

- [x] The items entered in the field are assembled into a list on the page by pressing the button.
- [x] The content of the input fields must be checked for blank as well as incorrect (eg too short) content
- [x] Incorrect content in the input field causes an error message as well as an incorrect field highlighting (eg red - `X` border).
- [x] It must be possible to remove elements from the list and mark the task as done
- [x] The application CSS and JavaScript must be specified in an external CSS file
- [x] The information in the list is stored in a browser, eg localstorage

### Additional

- [x] You can implement a counter that shows the number of open items in the list

## Webpack

There is a _very simple_ webpack configuration utilized. It does nothing really, just builds the application, helps with code splitting, and modularizing.

## SCSS

This project takes advantage of `SCSS`, and it webpack compiles it into a single output of `CSS` file.

## Dev Envrionment

TO run this application locally, follow these steps:

1) clone this repo
2) hit `npm i`
3) run `npm run start`
4) the applicatino will run on port `5050`

## Dependencies

There's only one major `dev` dependency, and that is `webpack`. This application was built using node 14.7

## Deployment

This applicatino is deployed to `netlify` via `GitHub` actions.

## Future Ideas

### Functions

The application could be extended in the future with these features

- sharing function
- reordering todos
- setting deadlines for todos

### Greenkeeping

There are some room left within the codebase for future greenkeeping, for example: 

- better code splitting for the SCSS
- `localStorage` could be handled via `Prototypes`