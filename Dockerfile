# Use a base image with node.js
FROM node:latest

# Set the working directory
WORKDIR /usr/src/nostrgit

# Copy the application files
COPY . .

# Install dependencies
RUN yarn

# Build the application
RUN yarn build

# Install serve
RUN yarn global add serve

# Expose the port on which the application will run
EXPOSE 3000

# Set the default command to start the application
CMD [ "serve", "-s", "build" ]