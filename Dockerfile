# Use a base image node:current-slim
FROM node@sha256:bd3c421bc8702b864a674bd1825c7fa7fa62e9e07d4ab2fa477581d47be4333e

# Set the working directory
WORKDIR /usr/src/nostrgit

# Copy the application files
COPY . .

# Install dependencies & build
RUN yarn

# Build the application
RUN yarn build

# Set production mode
ENV NODE_ENV production

# Install serve
RUN yarn global add serve

# Serve the build directory
CMD [ "serve", "-s", "build" ]