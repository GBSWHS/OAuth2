package main

import (
	"errors"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func checkClientApi(db *gorm.DB, tokenSecret string, codes *[]codeStructure) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var body checkClientQuery
		authorization := string(c.Request().Header.Peek("Authorization"))

		err := c.QueryParser(&body)
		if err != nil {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: err.Error(),
			})
		}

		if len(body.ID) < 1 {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_client_id_NOT_PROVIDED,
			})
		}

		if len(body.RedirectUri) < 1 {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_redirect_uri_NOT_PROVIDED,
			})
		}

		if len(body.ResponseType) < 1 {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_response_type_NOT_PROVIDED,
			})
		}

		if body.ResponseType != "code" {
			return c.Status(404).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_response_type_NOT_MATCH,
			})
		}

		var client Client
		result := db.First(&client, body.ID)
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.Status(404).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_client_id_NOT_MATCH,
			})
		}

		if body.RedirectUri != client.RedirectUri {
			return c.Status(404).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_redirect_uri_NOT_MATCH,
			})
		}

		if strings.HasPrefix(authorization, "Bearer") && len(strings.Split(authorization, " ")) > 1 {
			token, err := jwt.Parse(strings.Split(authorization, " ")[1], func(t *jwt.Token) (interface{}, error) {
				return []byte(tokenSecret), nil
			})

			if err == nil && token.Valid {
				if token.Method.Alg() != "HS256" {
					return c.JSON(checkClientResponse{Success: true, NeedLogin: true})
				}

				claims, ok := token.Claims.(jwt.MapClaims)
				if !ok {
					return c.JSON(checkClientResponse{Success: true, NeedLogin: true})
				}

				var user User
				result := db.First(&user, "id = ?", claims["id"])
				if errors.Is(result.Error, gorm.ErrRecordNotFound) {
					return c.JSON(checkClientResponse{Success: true, NeedLogin: true})
				}

				code := codeStructure{
					Value:       randString(32),
					ExpireAt:    time.Now().Add(time.Duration(1) * time.Minute),
					RedirectUri: client.RedirectUri,
					UserID:      user.ID,
				}
				*codes = append(*codes, code)

				state := ""
				if len(body.State) > 0 {
					state = "state=" + body.State
				}

				return c.JSON(checkClientResponse{
					Success:   true,
					NeedLogin: false,
					Redirect:  client.RedirectUri + "?code=" + code.Value + state,
				})
			}

			return c.JSON(checkClientResponse{Success: true, NeedLogin: true})
		}

		return c.JSON(checkClientResponse{Success: true, NeedLogin: true})
	}
}
