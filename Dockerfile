FROM node:19.9.0-alpine

# Workdir innerhalb des Containers festlegen
WORKDIR /home/ic20b050/app
# Kopiert das aktuelle Verzeichnis vom Host in das Image Verzeichnis
ADD . /home/ic20b050/app

# installiert die Node-Modules
RUN npm install

# gibt den Port 8000 frei
EXPOSE 8000

CMD ["node", "app.js"]
