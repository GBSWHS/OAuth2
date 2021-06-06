package main

import (
	"crypto/sha256"
	"errors"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func loginApi(db *gorm.DB, tokenSecret string, codes *[]codeStructure) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		var body loginBody

		err := c.BodyParser(&body)
		if err != nil {
			return c.Status(400).JSON(loginResponse{
				Success: false,
				Message: err.Error(),
			})
		}

		if len(body.ID) < 1 {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_user_id_NOT_PROVIDED,
			})
		}

		if len(body.Password) < 1 {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_user_password_NOT_PROVIDED,
			})
		}

		if result, err := verifyCaptcha(c.IP(), body.Captcha); err != nil || !result.Success {
			return c.Status(400).JSON(checkClientResponse{
				Success: false,
				Message: ERROR_captcha_NOT_PROVIDED,
			})
		}

		var user User
		result := db.First(&user, "id = ?", body.ID)
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return c.Status(404).JSON(loginResponse{
				Success: false,
				Message: ERROR_user_id_NOT_MATCH,
			})
		}

		hash := sha256.Sum256([]byte(user.Salt + body.Password))
		if fmt.Sprintf("%x", hash) != user.Passwd {
			return c.Status(403).JSON(loginResponse{
				Success: false,
				Message: ERROR_user_password_NOT_MATCH,
			})
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"id":  user.ID,
			"iat": time.Now().Unix(),
		})

		tokenString, err := token.SignedString([]byte(tokenSecret))
		check(err)

		return c.JSON(loginResponse{
			Success: true,
			Token:   tokenString,
		})
	}
}
