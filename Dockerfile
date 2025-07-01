# Use Node.js LTS as base image
FROM node:20

# Install OpenJDK (Java) and netcat (nc) for Firebase emulators
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Install Firebase CLI globally
RUN npm install -g firebase-tools

# Copy only package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies (if you want to use emulators with functions, install functions deps)
RUN npm install

# Copy the rest of your project files
COPY . .

# Copy the service account key into the image
COPY service-account.json /usr/src/app/service-account.json

# Set the environment variable for Google authentication
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/service-account.json"

# Expose default Firebase emulator ports
EXPOSE 5001 5003 5002 5000

# Set environment variable to avoid analytics prompt
ENV CI=true

# Build admin app
WORKDIR /usr/src/app/admin
RUN npm install && npm run build

# Set working directory back to root for runtime
WORKDIR /usr/src/app

# Run the start script
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

CMD ["/usr/src/app/start.sh"]