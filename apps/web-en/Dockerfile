# # Build runtime image.
# FROM node:18.16.0-alpine AS base

# FROM base AS deps
# RUN apk add --no-cache libc6-compat

# WORKDIR /usr/src/app
# RUN yarn global add turbo
# COPY . .
# RUN turbo prune web-en --docker

# # Installing dependencis
# COPY package.json yarn.lock ./
# RUN yarn --frozen-lockfile --production;
# RUN rm -rf ./.next/cache

# # FROM base AS builder
# WORKDIR /usr/src/app
# ENV NODE_OPTIONS="--max-old-space-size=2048"

# COPY --from=def /app/out/full/ .
# COPY turbo.json turbo.json

# RUN yarn turbo build --filter=web-en

# # Copying source files
# # COPY . .
# # COPY --from=deps /usr/src/app/node_modules ./node_modules
# # RUN yarn build:prod

# FROM base AS runner
# WORKDIR /usr/src/app

# ENV NODE_ENV=production
# ENV BUILD_ENV=production

# RUN npm install -g pm2
# RUN npm install -g cross-env
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/pm2-config.json ./pm2-config.json
# COPY --from=builder /usr/src/app/config ./config
# COPY --from=builder /usr/src/app/next.config.js ./next.config.js
# COPY --from=builder /usr/src/app/package.json ./package.json

# COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# USER nextjs

# EXPOSE 8080

# ENV PORT 8080

# # Running the app
# CMD ["yarn", "run", "start:prod" ]


# #커멘드
# docker build --build-arg BUILD_ENV=production -t menuboss-en -f apps/web-en/Dockerfile .
# docker run -d -p 8080:8080 menuboss-en
FROM node:18-alpine AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune web-en --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn --frozen-lockfile --production;

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ENV NODE_OPTIONS="--max-old-space-size=2048"

# Uncomment and use build args to enable remote caching
ARG BUILD_ENV
ENV BUILD_ENV=$BUILD_ENV

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo build --filter=web-en

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN npm install -g pm2
RUN npm install -g cross-env
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web-en/next.config.js .
COPY --from=installer /app/apps/web-en/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-en/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-en/.next/static ./apps/web-en/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-en/public ./apps/web-en/public
COPY --from=builder /app/apps/web-en/pm2-config.json ./apps/web-en/pm2-config.json
COPY --from=builder /app/apps/web-en/config ./apps/web-en/config
COPY --from=builder /app/apps/web-en/next.config.js ./apps/web-en/next.config.js

WORKDIR /app/apps/web-en

EXPOSE 8080

ENV PORT 8080

CMD yarn run start:prod
# CMD ["yarn", "run", "start:prod" ]