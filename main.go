package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	app := fiber.New()
	codes := []codeStructure{}
	tokenSecret := randString(32)

	err := godotenv.Load()
	check(err)

	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN: "oauth:@tcp(localhost:3306)/oauth?charset=utf8mb4&parseTime=true&loc=Local",
	}), &gorm.Config{})
	check(err)

	renderAuthPage()

	app.Use(logger.New())
	app.Get("/auth", func(c *fiber.Ctx) error {
		c.Set("Content-Type", "text/html; charset=utf-8")
		return c.SendString(authpage)
	})

	app.Post("/api/ident", identApi(db, &codes))
	app.Post("/api/login", loginApi(db, tokenSecret, &codes))
	app.Post("/api/checkClient", checkClientApi(db, tokenSecret, &codes))

	app.Static("/", "./public")
	log.Fatal(app.Listen(":8080"))
}
