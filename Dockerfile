# Stage 1: Build
FROM node:20.15.1-alpine3.20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from the builder stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the HTTP port
EXPOSE 5137/tcp

# Start Nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
