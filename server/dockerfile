FROM node:18-alpine AS builder
WORKDIR /app
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY ./server ./
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

CMD [ "node", "dist/main.js" ]
