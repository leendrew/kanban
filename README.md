# Simple Kanban Dashboard (Server)

[Client Repo](https://github.com/leendrew/kanban-client-react)

## Stack

- Nest.js
- TypeORM
- PostgreSQL
- Docker

## Start

### dev

```bash
cp .env.example .env
yarn
docker-compose up db -d
yarn start:dev
```

or using make

```bash
cp .env.example .env
yarn
make up-dev
```

to shutdown

```bash
make down-dev
```

### prod

```bash
cp .env.example .env
docker-compose up --build
```

or using make

```bash
cp .env.example .env
make up-prod
```

to shutdown

```bash
make down-prod
```
