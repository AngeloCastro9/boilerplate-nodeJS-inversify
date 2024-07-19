FROM node:20.10.0

LABEL description="Boilerplate TypeScript Inversify" \
      version="1.0.0" \
      maintainer="Ângelo Castro <>"

WORKDIR /usr/src

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --prefer-offline --production --ignore-engines

COPY . .

EXPOSE 80

CMD ["node", "dist/index.js"]
