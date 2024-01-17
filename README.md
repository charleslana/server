# Server

# Install docker-compose

```bash
sudo apt install docker-compose
```

# Starter container

```bash
docker-compose -f docker-compose-dev.yml up -d
```

# Stop container

```bash
docker-compose -f docker-compose-dev.yml stop
```

## Create migrate

```bash
npm run migrate:generate user-column-vip
```

## Up migrate

```bash
npm run migrate:up
```

## Up migrate specific name

```bash
npm run migrate-name:up 20240117004750-user-character-column-.js
```

## Down migrate

```bash
npm run migrate:down
```

## Create seed

```bash
npm run seed:generate user-role-seeder
```

## Up seed

```bash
npm run seed:up
```

## Down seed

```bash
npm run seed:down
```
