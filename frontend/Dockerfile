FROM node:20-alpine

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package.json first (always exists)
COPY package.json ./

# Conditionally copy lock file if exists
COPY pnpm-lock.yaml* ./

# Install dependencies (works with or without lockfile)
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

# Copy all other files
COPY . .

# Build the app
RUN pnpm build

EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0"]