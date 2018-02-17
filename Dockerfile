FROM node:8

WORKDIR /app
EXPOSE 3000

COPY node_modules /app/node_modules
COPY .next /app/.next
COPY static /app/static
COPY package.json /app/package.json

HEALTHCHECK --interval=5s --timeout=60s CMD curl --fail http://localhost:3000/ || exit 1

ENTRYPOINT [ "yarn" ]

EXPOSE 3000

CMD ["start"]