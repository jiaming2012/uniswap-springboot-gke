# Use an official Node.js runtime as a parent image
FROM node:22.5.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code
RUN yarn tsc

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD ["node", "dist/index.js"]