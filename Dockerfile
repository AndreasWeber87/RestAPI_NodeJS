FROM node:18

WORKDIR /home/ic20b050/app
ADD . /home/ic20b050/app

EXPOSE 7000

CMD ["node", "app.js"]