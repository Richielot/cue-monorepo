.PHONY: dev build stop test seed lint clean logs

# Auto-detect Docker CLI (Docker Desktop on macOS doesn't always add to PATH)
DOCKER_BIN := /Applications/Docker.app/Contents/Resources/bin
export PATH := $(DOCKER_BIN):$(HOME)/bin:$(PATH)
DOCKER := $(shell command -v docker 2>/dev/null || echo $(DOCKER_BIN)/docker)

# Start development environment (Postgres + Next.js with hot reload)
dev:
	$(DOCKER) compose up --build

# Start in background
dev-bg:
	$(DOCKER) compose up --build -d

# Stop all services
stop:
	$(DOCKER) compose down

# Run tests inside the container
test:
	$(DOCKER) compose exec web pnpm test

# Run database seed
seed:
	$(DOCKER) compose exec web pnpm --filter=@cue/db db:seed

# Push schema to database
db-push:
	$(DOCKER) compose exec web pnpm db:push

# Generate database migrations
db-generate:
	$(DOCKER) compose exec web pnpm db:generate

# Run linting
lint:
	$(DOCKER) compose exec web pnpm lint

# Build production image
build:
	$(DOCKER) build --target runner -t cue-web:latest .

# View logs
logs:
	$(DOCKER) compose logs -f

# Clean everything (volumes, images, containers)
clean:
	$(DOCKER) compose down -v --rmi local
