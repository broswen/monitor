FROM node:16.11-alpine

WORKDIR app
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .

RUN ["npm", "ci"]

COPY ./src ./src

RUN ["npm", "run", "build"]

CMD ["node", "./build/main.js"]
