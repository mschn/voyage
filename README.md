# Voyage

Voyage is a file explorer in your browser.

It consists of:

- `ngx-voyage`, an Angular library that contains the File Explorer widget
- `voyage`, an Angular web application that binds the UI to the server
- A node.js server to read your local files

## Development

To start the dev environment:

```bash
# start the node.js backend
npm run start:server

# build the ngx-voyage library in watch mode
npm run start:lib

# build the voyage app in watch mode
npm run start:app
```

## Built with

- [Angular](https://angular.dev/)
- [Tailwind](https://tailwindcss.com/)
