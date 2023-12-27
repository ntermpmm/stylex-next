# StyleX + NextJS App Router

This project shows how to use StyleX with NextJS's App Router. Using App Router's unique capabilities, this project uses server components to transpile JS files dynamically to show you the
JS and CSS results of using the StyleX compiler on your code.

## Getting Started

Start by making sure that the dev server is running. If not use the following command.

```
$ npm run dev
```

After this the home page should open with a list of the Javascript files in the `app/` directory.

You can click on any of the filenames to see what the JS output of running that file through StyleX is.

You can also use the `CSS Output` link at the top-right of the page to see the CSS bundle for all the JS files.

**NOTE:** Because NextJS compiles pages lazily, the first time you click on a particular type of link, you may
notice a long wait time. Keep an eye on the Terminal to track the progress.

## Testing your components

You can add your own component files under the `app/` directory to see their output as well. Make sure you import
any new non-`page` components in a route and open the route to ensure that the unique CSS for that page is included
in the `CSS Output` preview.

## Limitations

- Lack of Theming APIs - Theming APIs currently break the server components that generate output previews.
  - They do work for the project itself, if you wanted to try using them without looking at the generated output.
- Unstable NextJS plugin - The NextJS plugin is used is very unstable. You should expect the occasional bug.
