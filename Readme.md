# Simple Registration Service

## Technologies
* NodeJs (Typescript)
* Redis (ioredis)
* Sequelize (Postgres) 
* Heroku
* Docker & Docker Compose

## Setup Project 
* Clone Repository

```bash
git clone `https://github.com/abahernest/mwf_task.git`
cd mwf_task
```
### Local Development
* Ensure postgres is installed and correctly setup
* Ensure Redis is installed
* Create a .env file identical to `env.example` file
* Populate the .env file with right credentials; creating the required databases where necessary
* Install dependencies `npm install`
* Start Application `npm start` or `npm run dev` to activate auto-reload
* Run tests `npm test`

### Using Docker
* Create a .env file identical to `env.example` file
* Populate the .env file with right credentials (NOT MANDATORY)
* Using docker compose `docker compose up`
* Test runs automatically

## Postman Documentation

[Postman Doc](https://documenter.getpostman.com/view/11044390/UzsBU31N)
