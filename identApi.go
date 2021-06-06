package main

import (
	"errors"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func identApi(db *gorm.DB, codes *[]codeStructure) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var body identBody
		c.BodyParser(&body)

		err := c.BodyParser(&body)
		if err != nil {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: err.Error(),
			})
		}

		if len(body.Code) < 1 {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: ERROR_ident_code_NOT_PROVIDED,
			})
		}

		if len(body.GrantType) < 1 {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: ERROR_grant_type_NOT_PROVIDED,
			})
		}

		if len(body.Secret) < 1 {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: ERROR_client_secret_NOT_PROVIDED,
			})
		}

		if len(body.ID) < 1 {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: ERROR_ident_client_id_NOT_PROVIDED,
			})
		}

		if len(body.RedirectUri) < 1 {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: ERROR_ident_redirect_uri_NOT_PROVIDED,
			})
		}

		if body.GrantType != "authorization_code" {
			return c.Status(400).JSON(identResponse{
				Success: false,
				Message: ERROR_grant_type_NOT_MATCH,
			})
		}

		var client Client
		result := db.First(&client, body.ID)
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.Status(404).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_ident_client_id_NOT_MATCH,
			})
		}

		if client.Secret != body.Secret {
			return c.Status(403).JSON(identResponse{
				Success: false,
				Message: ERROR_client_secret_NOT_MATCH,
			})
		}

		var code *codeStructure
		for i, value := range *codes {
			log.Print(value)
			if !value.Used && value.ExpireAt.After(time.Now()) && value.Value == body.Code {
				code = &value
				(*codes)[i].Used = true
			}
		}

		if code == nil {
			return c.Status(404).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_ident_code_NOT_MATCH,
			})
		}

		if client.RedirectUri != body.RedirectUri || client.RedirectUri != code.RedirectUri {
			return c.Status(403).JSON(identResponse{
				Success: false,
				Message: ERROR_ident_redirect_uri_NOT_MATCH,
			})
		}

		var user User
		result = db.First(&user, "id = ?", code.UserID)
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.Status(500).JSON(identResponse{
				Success: false,
				Message: ERROR_user_MISSING,
			})
		}

		return c.JSON(identResponse{
			Success: true,
			User:    user,
		})
	}
}
