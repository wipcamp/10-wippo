FROM node:8.9.3

WORKDIR /node-app
ADD . /node-app

RUN cd /node-app && yarn install && yarn build

EXPOSE 3000

ENV YARN_COMMAND=start

CMD ["sh", "-c" , "yarn run $YARN_COMMAND"]