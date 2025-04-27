# Use official Node image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app source
COPY . .

# Expose port React dev server will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
