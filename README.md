# LMS

## Purpose

This application allows super users to create users as both teachers and students.
Teachers and admins can create courses for students to enroll in.
Students can enroll in courses and can see a list of the courses they are currently enrolled in.

## Steps to use

- Fork the repo

- For the Frontend
- Use the terminal command "cd frontend" to ensure you are in the correct folder.
- In order to use Material UI which the application is made using, run the terminal command "npm install @mui/material @emotion/react @emotion/styled"
- React Hook Form is also implemented in this application, run the terminal command "npm install react-hook-form" to install the dependancies
- The forms use the Yup resolvers schema, to install run the terminal command "npm install @hookform/resolvers yup"
- Run terminal command "npm start" in order to start the front end and you should be taken to the login screen.
- In order to run the tests, use the terminal command "npm test" for the frontend tests

- For the Backend
- In order to be able to communicate with the Django backend, you need to create a virtual environment.
- To do so, the terminal command "python -m venv /path/to/new/virtual/environment" will need to be run where "venv" is the name of the virtual environment and the path is the "backend" folder
- To use the new venv, run the terminal command "venv/scripts/activate". This will allow you to run the server for the backend
- Install Django by running the terminal command "python -m pip install Django"
- The application makes use of the Django REST Framework, to install with the terminal "pip install djangorestframework" to install the dependancies.
- Add "rest_framework" to the list of INSTALLED APPS
- To run the server, run the terminal command "python manage.py runserver"

## API endpoints

- The API makes use of viewsets which are detailed below:

| API                | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| courses            | Handles the creation, alteration and display of courses        |
| studentsAndCourses | Handles the relation between courses and the students enrolled |
| users              | Handles the creation, alteration and display of users          |
| login              | Login and logout functionality provided by Knox                |

## Repository Structure

```bash
/percipio-fullstack-project
├── /backend
│   ├── /api
│   │   ├── __init__.py                      # Default created, holds no code
│   │   ├── admin.py                         # Admin urls for Django
│   │   ├── apps.py                          # Main app config
│   │   ├── auth_backend.py                  # The auth backend
│   │   ├── models.py                        # User defined data tables
│   │   ├── serializers.py                   # Serializers that the views use to get required data
│   │   ├── tests.py                         # Where Django tests are stored
│   │   ├── urls.py                          # Stores the rest framework routers and their basenames
│   │   └── views.py                         # Where the various viewsets are defined
│   ├── /crud
│   │   ├── __init__.py                      # Default created, holds no code
│   │   ├── asgi.py                          # Default created, used for async deployments
│   │   ├── deployment_settings.py           # Created to set settings used when deploying the project
│   │   ├── settings.py                      # Settings for development
│   │   ├── urls.py                          # Contains the urls for the admin as well as the knox logout
│   │   └── wsgi.py                          # Default created, used for non async deployment
│   ├── db.sqlite3                            # Database file
│   ├── lmsvenv                               # Virtual environment
│   ├── static                                # Contains all the static files for the backend
│   ├── manage.py                             # Command line utility
│   └── requirements.txt                      # Contains the required dependancies Railway requires to build and deploy
│
├── /frontend
│   ├── public                                # Contains the index, logo, favicon and logos
│   ├── /src
│   │   ├── /Components                       # Contains the React components used to build the app
│   │   │   ├── /FormComponents               # Contains the custom Material UI components
│   │   ├── /Tests                            # Contains the frontend test files
│   │   ├── App.js                            # Main React App
│   │   ├── index.css                         # Contains the css for the app
│   │   ├── index.js                          # Default index Javascript file
│   │   └── logo.svg                          # Default React logo
│   └── package.json                          # Lists frontend project dependencies, scripts, and metadata for Node.js
│
├── /postman
│   ├── collections                           # Contains various yaml files used for the Postman application to test the api
├── /wireframes                               # Contains the wireframe images
└── README.md
```

## Architecture Overview

**Frontend**

- Built with Javascript, React with Material UI for styling and component structure
- Connects to Knox for authentication and Axios API for server requests

**Backend**

- Built with Node.js, Django and SQLite for the database
- Handles authentication and database writes

## SQLite tables

| Table          | Purpose                                            |
| -------------- | -------------------------------------------------- |
| LMSUserManager | Manages the creation of new users                  |
| LMSUser        | Stores users, is extended from Django default user |
| Courses        | Stores individual course records                   |
| subscriptions  | Tracks plan and payment status                     |

# Current tech debt stack

- finish validation for Add/Edit User. The select field won't trigger validation
- Further general styling work

- Additional tests

Styling
Jest and django unit tests

Tests to do
Login
Student Enroll
Course create
Course delete
Course details
User add
User delete

## Resources used

Material UI
Django documentation
Django Rest Framework
React Hook Form
React Hook Form Resolvers - Yup
