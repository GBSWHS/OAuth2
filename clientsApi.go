package main

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func clientApi(db *gorm.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		id := string(c.Request().URI().QueryArgs().Peek("id"))

		var client Client
		db.First(&client, "id = ?", id)

		c.JSON(clientResponse{
			Success: true,
			Client: S_Client{
				ID:          *client.ID,
				Name:        client.Name,
				Icon:        client.Icon,
				Secret:      client.Secret,
				OwnerId:     client.OwnerId,
				Website:     client.Website,
				Description: client.Description,
				RedirectUri: client.RedirectUri,
				UsedCount:   client.UsedCount,
				CreatedAt:   client.CreatedAt,
				UpdatedAt:   client.UpdatedAt,
			},
		})
		return nil
	}
}

func clientsApi(db *gorm.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		user := string(c.Request().URI().QueryArgs().Peek("user"))

		var clients []Client
		db.Find(&clients, "owner_id = ?", user)

		var s_clients []S_Client
		for _, client := range clients {
			s_clients = append(s_clients, S_Client{
				ID:          *client.ID,
				Secret:      client.Secret,
				RedirectUri: client.RedirectUri,
				UsedCount:   client.UsedCount,
				Name:        client.Name,
				Icon:        client.Icon,
				Website:     client.Website,
				Description: client.Description,
				CreatedAt:   client.CreatedAt,
				UpdatedAt:   client.UpdatedAt,
			})
		}

		c.JSON(clientsResponse{
			Success: true,
			Clients: s_clients,
		})
		return nil
	}
}

func clientsCreateApi(db *gorm.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var body createClientBody

		err := c.BodyParser(&body)
		if err != nil {
			return c.Status(400).JSON(createClientResponse{
				Success: false,
				Message: err.Error(),
			})
		}

		if len(body.Name) < 1 {
			return c.Status(400).JSON(createClientResponse{
				Success: false,
			})
		}

		if len(body.RedirectUri) < 1 {
			return c.Status(400).JSON(createClientResponse{
				Success: false,
			})
		}

		if len(body.OwnerId) < 1 {
			return c.Status(400).JSON(createClientResponse{
				Success: false,
			})
		}

		if os.Getenv("ENVIROMENT") != "DEVELOPMENT" {
			if result, err := verifyCaptcha(body.Captcha); err != nil || !result.Success {
				return c.Status(400).JSON(createClientResponse{
					Success: false,
				})
			}
		}

		current := uint(time.Now().Unix())
		db.Create(&Client{
			ID:          &current,
			Name:        body.Name,
			Secret:      randString(30),
			RedirectUri: body.RedirectUri,
			UsedCount:   0,
			OwnerId:     body.OwnerId,
			Icon:        body.Icon,
			Description: body.Description,
			Website:     body.Website,
		})

		return c.Status(200).JSON(createClientResponse{
			Success: true,
		})
	}
}
