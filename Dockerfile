FROM node:16.9.0-alpine3.11

RUN apk add --no-cache git

WORKDIR /app

COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY package.json tsconfig.json ./

RUN yarn --pure-lockfile

COPY apps/ apps/
RUN yarn build
CMD ["yarn", "start"]
