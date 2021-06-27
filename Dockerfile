FROM node:14

RUN mkdir -p /src/user/express-jwt-cookie
WORKDIR /src/user/express-jwt-cookie

COPY package*.json ./

COPY . .
ENV PORT 80
ENV ENVIRONMENT "dev"
ENV VERSION "not-provided"

RUN yarn install

CMD [ "yarn", "start" ]

EXPOSE $PORT
