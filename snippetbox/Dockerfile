FROM golang:1.22.4-bullseye as build

WORKDIR /app/api

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build \
  -ldflags="-linkmode external -extldflags -static" \
  -tags netgo \
  -o app ./cmd/web

###
FROM scratch

COPY --from=build /app/api/app app

EXPOSE 7000

CMD ["/app", "-addr=:7000"]