FROM node:19.9.0-alpine

# set Workdir inside the image
WORKDIR /home/ic20b050/app
# copy the current dir from the host in the image dir
ADD . /home/ic20b050/app

# install the Node-Modules from package.json
RUN npm install

# release the port to the host
EXPOSE 8000

CMD ["node", "app.js"]
