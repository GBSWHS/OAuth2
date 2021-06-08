package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const DSN = "oauth:@tcp(localhost:3306)/oauth?charset=utf8mb4&parseTime=true&loc=Local"

func main() {
	app := fiber.New()
	codes := []codeStructure{}
	tokenSecret := randString(32)

	err := godotenv.Load()
	check(err)

	db, err := gorm.Open(mysql.New(mysql.Config{DSN: DSN}))
	check(err)

	app.Use(logger.New())
	app.Post("/api/ident", identApi(db, &codes))
	app.Post("/api/login", loginApi(db, tokenSecret, &codes))
	app.Get("/api/checkClient", checkClientApi(db, tokenSecret, &codes))

	port := os.Getenv("PORT")
	if len(port) < 1 {
		port = ":8080"
	}

	panic(app.Listen(port))
}
