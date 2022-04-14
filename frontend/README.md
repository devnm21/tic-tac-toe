# CuroStrides Assignment

This React app is created as part of an interview process. 

To start the project, must install packages with `yarn` (preferred)

## Available Scripts

### `yarn dev`
To start the development server

### `yarn dev:gql`
To start the development server with graphql schema watcher. This script also runs another node file which watches for
.graphql schema changes and runs `yarn codegen` to create TS types/definitions and graphql hooks. 

###### Note: This might not work as expected on a Windows machine.

### `yarn build`
To generate a production build

