# Simple Kanban Dashboard (Server)

[Client Repo](https://github.com/leendrew/kanban-client-react)

[Deployed](https://kanban-server-nest.onrender.com)

[Swagger Docs](https://kanban-server-nest.onrender.com/docs)

## Stack

- Nest.js
- TypeORM
- PostgreSQL
- Docker

## Start

### dev

```bash
cp .env.example .env
pnpm
docker-compose up db -d
pnpm start:dev
```

or using make

```bash
cp .env.example .env
pnpm
make up-dev
```

to shutdown

```bash
make down-dev
```

### db seed

```bash
pnpm db:seed
```

or using make

```bash
make db-seed
```

### prod

```bash
cp .env.example .env.prod
docker-compose up app --build
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
