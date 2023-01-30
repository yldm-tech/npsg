# Use an official Node.js runtime as the base image
FROM node:16

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Run prisma build script
RUN yarn prisma:generate

# Build the application
RUN yarn build

# Expose the application's port
EXPOSE 3000

CMD [ "node", "dist/main.js" ]