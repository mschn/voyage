# Voyage

[![Docker](https://img.shields.io/docker/v/mschnr/voyage?color=blue&label=docker)](https://hub.docker.com/r/mschnr/voyage)

Voyage is a file explorer in your browser.

## Startup

You can run Voyage in Docker with the following command:

```bash
docker run -d --rm \
    --name voyage \
    -p 3003:3003 \
    -v $HOME:/files \
    -e VOYAGE_ROOT=/files \
    mschnr/voyage
```

Alternatively you can write a `docker-compose.yml`:

```yml
services:
  voyage:
    image: "mschnr/voyage"
    container_name: "voyage"
    ports:
      - "3003:3003"
    volumes:
      - "/home/mschn:/files"
    environment:
      VOYAGE_ROOT: "/files"
```

Then run `docker compose up -d`

## Development

To start the dev environment:

```bash
# start the node.js backend
npm run start:server

# build the voyage app in watch mode
npm run start:app
```

## Built with

- [ngx-voyage](https://github.com/mschn/ngx-voyage)
- [Angular](https://angular.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Primeng](https://primeng.org/)
