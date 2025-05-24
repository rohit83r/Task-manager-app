# Use Node.js 20 with Alpine
FROM node:20-alpine

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Copy Prisma schema
COPY prisma ./prisma/

# Install dependencies (including devDependencies for build)
RUN pnpm install

# Generate Prisma client
RUN pnpm prisma generate

# Copy all source files
COPY . .

# Build TypeScript
RUN pnpm build

# Expose the app port (adjust according to your app)
EXPOSE 3000

# Start the application
CMD ["pnpm" , "dev"]