# dev

# up
up-dev: up-db-dev up-app-dev

up-db-dev:
	docker-compose up db -d

up-app-dev:
	yarn start:dev

# stop
stop-dev: stop-db-dev

stop-db-dev:
	docker-compose stop db

# down
down-dev: down-db-dev

down-db-dev:
	docker-compose down db

# prod

# up
up-prod: up-db-prod up-app-prod

up-db-prod:
	docker-compose up db -d

up-app-prod:
	docker-compose up app -d

# stop
stop-prod: stop-db-prod stop-app-prod

stop-db-prod:
	docker-compose stop db

stop-app-prod:
	docker-compose stop app

# down
down-prod: down-db-prod down-app-prod

down-db-prod:
	docker-compose down db

down-app-prod:
	docker-compose down app
