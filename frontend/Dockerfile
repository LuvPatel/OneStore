# Use Node.js 20 image as the base image
FROM node:20-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 80
EXPOSE 80

CMD ["npm", "start"]



# Build the React application
# RUN npm run build
# RUN npm install -g serve
# Use the official Nginx image to serve the built application
# FROM nginx:alpine
# # Copy the built files from the previous stage to the Nginx directory
# COPY --from=build /app/build /usr/share/nginx/html

# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
# CMD ["serve", "-s", "build", "-l", "80"]