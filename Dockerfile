FROM node:12

COPY . app/

WORKDIR app/ 

RUN npm install


EXPOSE 3001

ENTRYPOINT npm run dev
