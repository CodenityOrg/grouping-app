FROM mhart/alpine-node:11 AS builder

WORKDIR /app
COPY . .
RUN yarn install

RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve

WORKDIR /app

COPY --from=builder /app/build .
COPY ./env.sh .
COPY .env .

RUN apk add --no-cache bash

RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/app/env.sh && serve -p 80 -s ."]
