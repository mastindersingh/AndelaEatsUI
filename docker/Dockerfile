FROM node:carbon
LABEL MAINTAINER="Maryanne Ng'ang'a <maryanne.nganga@andela.com>"
LABEL application="feed-frontend"
ENV TERM=xterm-256color

RUN yarn global add serve@9.2.0
WORKDIR /app
COPY client/dist /app
