# Get Jokes Count

Download or `git clone` this repository to run locally.

## Backend Server
The code for the backend server is in the `api` directory.

    cd api


### Installation
First, ensure Python 3.7+ is installed. Next, install the required dependencies using a virtual environment:

    python3 -m venv .env
    source .env/bin/activate
    pip3 install -r requirements.txt


### Run the server:
```
python3 app_api.py
```
The server launched will be available at `http://localhost:8000/`.

### Run tests
```
python3 test_app.py
```

## Frontend

This project was built using [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1. First, cd to the `public` directory on a new terminal tab or window.

    cd public

First, ensure a minimum Node.js version of either v10.13 or v12.0 is installed.

### Installation
Install Angular CLI. Next, install the require dependencies as follows:

    npm install -g @angular/cli
    npm install


### Serve the results
Use port 8080 for a dev server, which will automatically navigate to `http://localhost:8080/`.
```
ng serve --open --port 8080
```

### Run tests
To execute unit tests via Karma, run the below command:
```
ng test
```
