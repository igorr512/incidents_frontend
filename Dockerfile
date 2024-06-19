# Stage 1: Build the React app
FROM node:18 as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app
RUN npm run build

RUN npm install -g serve 

EXPOSE 3000

CMD ["serve", "-s", "build"]    