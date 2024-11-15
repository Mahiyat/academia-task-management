## Table of Contents
- [Academia Application](#academia-application)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Docker Setup](#docker-setup)
    - [Manual Setup (Without Docker)](#manual-setup-without-docker)
      - [1. Backend (Node.js Server)](#1-backend-nodejs-server)
      - [2. Frontend (React Client)](#2-frontend-react-client)
      - [3. MongoDB](#3-mongodb)
      - [4. Ollama](#4-ollama)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [Running Commands](#running-commands)
  - [Troubleshooting](#troubleshooting)
- [Project Setup So Far](#project-setup-so-far)
  - [Server](#server)
  - [Client](#client)
  
---

# Academia Application
This application, Academia, is a Node.js and React.js project that provides a web-based interface and API for users, with MongoDB as the database and an integrated AI-driven response generation using Ollama. This README covers how to set up the application using Docker (recommended) and manual setup instructions if you prefer not to use Docker.

To know details about Academia application click [here](https://github.com/Mahiyat/academia-task-management/wiki/Software-Requirement-Specification)


---

## Features
- Full-stack application with Node.js backend and React.js frontend.
- MongoDB as the database for storing user data.
- AI response generation powered by Ollama AI model.
- Configurable environment variables for database connection, secret keys, and token duration.

---

## Prerequisites
- Docker and Docker Compose (for Docker setup)
- Node.js (version 18 or higher) and npm/Yarn (for manual setup)
- MongoDB instance (local or MongoDB Atlas)

---

## Installation

### Docker Setup
1. Clone the repository:<br>
   **Using Https:**
    ```bash
    git clone https://github.com/Mahiyat/academia-task-management.git
    cd academia
    ```
    **Using SSH:**
    ```bash
    git clone git@github.com:Mahiyat/academia-task-management.git
    cd academia
    ```

2. Update Environment Variables: Create an `.env` file in the root directory with the required variables (see Environment Variables section).

3. Start the Application: Run the following command to start all services using Docker Compose(without GPU support):
    ```bash
    docker compose up -d --build
    ```

    If you want GPU support, run the following command to start all services using Docker Compose:
    ```bash
    docker compose -f docker-compose-ollama-gpu.yml up -d --build
    ```

This will:
- Start the React client on http://localhost:3000.
- Start the Node.js server on http://localhost:5000.
- Start MongoDB on port 27017.
- Start Ollama AI service on port 11434.

1. Access the Application:
   - Frontend (React client): http://localhost:3000
   - Backend API (Node.js server): http://localhost:5000

To stop the application, run:
    ```bash
    docker compose down
    ```

**Note: To setup GPU you can follow [Installing the NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) and [GPU Support in Docker Desktop](https://docs.docker.com/desktop/features/gpu/)**

### Manual Setup (Without Docker)
If you prefer to run the application without Docker, follow these steps:

#### 1. Backend (Node.js Server)
- Navigate to the server directory:
    ```bash
    cd server
    ```
- Install dependencies:
    ```bash
    yarn install
    ```
- Create an `.env` file in the server directory with the necessary environment variables (see Environment Variables section).
- Run the server:
    ```bash
    yarn start
    ```
This will start the Node.js server on http://localhost:5000.

#### 2. Frontend (React Client)
- Navigate to the client directory:
    ```bash
    cd client
    ```
- Install dependencies:
    ```bash
    yarn install
    ```
- Run the client:
    ```bash
    yarn start
    ```
This will start the React client on http://localhost:3000.

#### 3. MongoDB
- If you are using MongoDB locally, ensure it is running on port 27017 or update the `MONGO_URI` in the `.env` file with your connection string.

#### 4. Ollama
- If Ollama is required for AI features, install and start Ollama following the Ollama documentation and set the base URL in the `OLLAMA_BASE_URLS` environment variable to `http://localhost:11434`.

---

## Environment Variables
Create an `.env` file in both server and client directories as needed with the following variables:

- **Server Environment Variables** (server/.env):
    ```plaintext
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
    SECRET_KEY=my-secret-key
    TOKEN_DURATION=1h
    OLLAMA_BASE_URLS=http://academia-ollama:11434 (or http://localhost:11434 if running locally without Docker)
    ```

- **Client Environment Variables** (client/.env) (optional):
    ```plaintext
    # Add any variables necessary for the client.
    ```

---

## Usage

### Running Commands
- **Starting Docker:** `docker-compose up --build`
- **Shutting Down Docker:** `docker-compose down`

---

## Troubleshooting

- **Internal Server Errors:**
  - Ensure `OLLAMA_BASE_URLS` is correctly configured, especially in Docker where the service name `academia-ollama` can be used instead of `host.docker.internal`.
  
- **Database Connection Issues:**
  - Verify `MONGO_URI` is correct and accessible from within the Docker network (or your local network, if running without Docker).
  
- **Missing Dependencies:**
  - Make sure all required dependencies are installed with `yarn install` in each respective directory.

For further help, please refer to the [Docker documentation](https://docs.docker.com/get-started/) or [Ollama documentation](https://github.com/ollama/ollama).

---

# Project Setup So Far
## Server
- [X] Initiate nodejs server
- [X] Configure router
- [X] Connect database
- [X] Add a simple API implementation
- [ ] Add basic authentication
- [ ] Add logging
- [X] Add unit test
- [X] Add lint rules
- [X] Add documentation tool (jsdoc)
- [X] Dockerize
- [ ] Add app runner CLI

## Client
- [X] Create react app for client
- [X] Add frontend components
- [ ] Connect backend REST APIs to frontend
- [ ] Add lint rules
- [ ] Add documentation tool (storybook)
- [X] Dockerize
- [ ] Configure React Router 

