package main

import (
	"database/sql"
	"errors"
	"os"

	"gorm.io/gorm"
)

func isInited(db *gorm.DB) bool {
	var client Client
	result := db.First(&client, 0)
	return !errors.Is(result.Error, gorm.ErrRecordNotFound)
}

func initClient(db *gorm.DB) {
	init := Client{
		ID:          new(uint),
		Secret:      os.Getenv("INIT_CLIENT_KEY"),
		RedirectUri: "/dash",
		UsedCount:   0,
		OwnerId:     "0",
		Owner: User{
			ID:          "0",
			Grade:       0,
			Class:       0,
			ClassNumber: 0,
			RoomNumber:  0,
			Name:        "system",
			Nickname:    sql.NullString{Valid: true, String: "System"},
			Passwd:      "",
			Salt:        "",
			Permission:  0,
		},
	}

	db.Create(&init)
}
