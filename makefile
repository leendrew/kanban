# dev
# db local on docker

# up
up-dev: up-db-dev up-app-dev

up-db-dev:
	docker-compose up db -d

up-app-dev:
	pnpm start:dev

# stop
stop-dev: stop-db-dev

stop-db-dev:
	docker-compose stop db

# down
down-dev: down-db-dev

down-db-dev:
	docker-compose down db

# prod
# db external on render.com

# up
up-prod: up-app-prod

up-app-prod:
	docker-compose up app -d

# stop
stop-prod: stop-app-prod

stop-app-prod:
	docker-compose stop app

# down
down-prod: down-app-prod

down-app-prod:
	docker-compose down app

# db seed

db-seed:
	pnpm db:seed

# prod db migrations

migrations-generate:
	npx ts-node ./node_modules/typeorm/cli migration:generate ./src/database/migrations/* -d ./src/typeorm.config.ts

migrations-run:
	npx ts-node ./node_modules/typeorm/cli migration:run -d ./src/typeorm.config.ts
