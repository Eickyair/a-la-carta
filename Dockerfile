FROM node:lts-slim
WORKDIR /web_app
COPY . .
RUN yarn
CMD [ "yarn","dev" ]