FROM golang:1.22.4-alpine

WORKDIR /app/api

COPY go.mod ./

RUN go mod tidy

COPY . .

RUN go build -o app ./cmd/web

EXPOSE 7000

CMD ["./app", "-addr=:7000"]