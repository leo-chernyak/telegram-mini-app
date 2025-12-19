FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml ./
COPY bot-server/package.json bot-server/package.json
COPY miniapp/package.json miniapp/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
RUN pnpm --filter bot-server build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "--filter", "bot-server", "start"]


