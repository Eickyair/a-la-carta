FROM node:lts-slim
WORKDIR /web_app
COPY . .
EXPOSE 3000
RUN yarn
CMD [ "yarn","dev" ]