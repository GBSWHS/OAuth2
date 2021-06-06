package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	app := fiber.New()
	codes := []codeStructure{}
	tokenSecret := randString(32)

	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN: "oauth:@tcp(localhost:3306)/oauth?charset=utf8mb4&parseTime=true&loc=Local",
	}), &gorm.Config{})
	check(err)

	app.Use(logger.New())
	app.Get("/auth", func(c *fiber.Ctx) error {
		return c.SendFile("./page/auth.html")
	})

	app.Post("/api/ident", identApi(db, &codes))
	app.Post("/api/login", loginApi(db, tokenSecret, &codes))
	app.Post("/api/checkClient", checkClientApi(db, tokenSecret, &codes))

	app.Static("/", "./public")
	log.Fatal(app.Listen(":8080"))
}
