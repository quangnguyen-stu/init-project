up:
	docker-compose up -d

up-clean:
	docker-compose up -d --build --force-recreate --remove-orphans

exec:
	docker-compose exec app sh

format:
	docker-compose exec app yarn format ;\
	docker-compose exec app composer format

# make con name=AbcController
con:
	docker-compose exec app php artisan make:controller $(name)
mo:
	docker-compose exec app php artisan make:model $(name)
mi:
	docker-compose exec app php artisan make:migration $(name)

migrate:
	docker-compose exec app php artisan migrate --seed
example:
	docker-compose exec app php artisan db:seed --class=ExampleSeeder
demo:
	docker-compose exec app php artisan db:seed --class=DemoExampleSeeder
rollback:
	docker-compose exec app php artisan migrate:rollback
drop:
	docker-compose exec app php artisan db:wipe

# production
build:
	docker build \
		--platform linux/x86_64 \
		-f docker/app/prod.Dockerfile \
		-t vjm \
		.

login:
	aws ecr get-login-password \
    --region ap-southeast-1 \
	| docker login \
    --username AWS \
    --password-stdin 228734582200.dkr.ecr.ap-southeast-1.amazonaws.com

tag:
	docker tag \
		vjm:latest \
		228734582200.dkr.ecr.ap-southeast-1.amazonaws.com/vjm:0.1.02

push:
	docker push \
		--all-tags \
		228734582200.dkr.ecr.ap-southeast-1.amazonaws.com/vjm

run:
	docker run \
		--detach \
		--name vjm-test \
		--env-file .env \
		-p 80:80 \
		vjm:latest
