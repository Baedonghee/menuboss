# #커멘드
# docker build --build-arg BUILD_ENV=production -t menuboss-ko -f apps/web-ko/Dockerfile .
# docker run -d -p 8080:8080 menuboss-ko
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
RUN turbo prune web-ko --docker

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

RUN yarn turbo build --filter=web-ko

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN npm install -g pm2
RUN npm install -g cross-env
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web-ko/next.config.js .
COPY --from=installer /app/apps/web-ko/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-ko/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-ko/.next/static ./apps/web-ko/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-ko/public ./apps/web-ko/public
COPY --from=builder /app/apps/web-ko/pm2-config.json ./apps/web-ko/pm2-config.json
COPY --from=builder /app/apps/web-ko/config ./apps/web-ko/config
COPY --from=builder /app/apps/web-ko/next.config.js ./apps/web-ko/next.config.js

WORKDIR /app/apps/web-ko

EXPOSE 8080

ENV PORT 8080

CMD yarn run start:prod
# CMD ["yarn", "run", "start:prod" ]