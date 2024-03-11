FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
#RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/client-demo-test/browser /usr/share/nginx/html
EXPOSE 80