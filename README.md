# gitElectron

App is based on .NET Core 2 on backend and Angular on frontend. To run applicanion you must run both of them on two separate consoles.

# .NET Core section

Go to Api folder. In console run:
`dotnet restore`
`dotnet build`
`dotnet run`
Application should start.

This is git gui so we need git repository to test our application. Recomended (for this moment) to use a separate repository. Create new empty repository on you computer and apply path to it in `application secrets` of API project eg. 
```json{
  "repositoryPath": "C:\\Projects\\Repositories\\Simple"
}`

# Angular section

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Development server

After clone navigate to `gitWebApp` folder and run `npm install` after it run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
