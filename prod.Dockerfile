# Step 1. Rebuild the source code only when needed
FROM node:14-alpine AS builder

WORKDIR /app

# Copy lock files if file exists
COPY package.json yarn.lock* package-lock.json* ./

# Omit --production flag for TypeScript devDependencies
RUN yarn install

COPY src ./src
COPY public ./public
COPY next.config.js .
# COPY next-i18next.config.js .
COPY tsconfig.json .
# COPY postcss.config.js .
# COPY tailwind.config.js .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
# ARG NEXTAUTH_URL
# ENV NEXTAUTH_URL=${NEXTAUTH_URL}
# ARG NEXTAUTH_SECRET
# ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Step 2. Production image, copy all the files and run next
FROM node:14-alpine AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package.json .
# COPY --from=builder /app/next-i18next.config.js .
COPY --from=builder /app/tsconfig.json .
# COPY --from=builder /app/postcss.config.js .
# COPY --from=builder /app/tailwind.config.js .

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
# ARG NEXTAUTH_URL
# ENV NEXTAUTH_URL=${NEXTAUTH_URL}
# ARG NEXTAUTH_SECRET
# ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

CMD node server.js
