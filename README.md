# gitElectron

App is based on .NET Core 2 on backend and Angular on frontend. To run applicanion you must run both of them on two separate consoles.

# .NET Core section

Go to Api folder. In console run:
`dotnet restore`
`dotnet build`
`dotnet run`

Server should start.

# Angular section

Go to gitWebApp folder. In second console run:
`npm install`
`ng serve`

 Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
