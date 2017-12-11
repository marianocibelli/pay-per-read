FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm config set registry http://registry.npmjs.org/
RUN npm install --no-optional --production

#Map port on LoadBalancer
EXPOSE 3001
#APP_ENV Has to be setted to use different environments
CMD npm run start:$APP_ENV
