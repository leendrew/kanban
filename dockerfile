FROM node:18-alpine AS builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY ./ ./
RUN yarn build

FROM builder
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env.prod ./.env

CMD [ "node", "dist/main.js" ]
