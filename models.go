package main

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type Client struct {
	ID          uint `gorm:"primaryKey"`
	Secret      string
	RedirectUri string
	UsedCount   uint
	OwnerId     string
	Owner       User
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

type User struct {
	ID          string `gorm:"primaryKey"`
	Grade       uint
	Class       uint
	ClassNumber uint
	RoomNumber  uint
	Name        string
	Nickname    sql.NullString
	Passwd      string
	Salt        string
	Permission  uint
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
}

type checkClientQuery struct {
	ID           string `query:"client_id"`
	RedirectUri  string `query:"redirect_uri"`
	ResponseType string `query:"response_type"`
	State        string `query:"state"`
}

type checkClientResponse struct {
	Success   bool   `json:"success"`
	Message   string `json:"message"`
	NeedLogin bool   `json:"needLogin"`
	Redirect  string `json:"redirect"`
}

type loginBody struct {
	ID       string `json:"id" xml:"id" form:"id"`
	Password string `json:"password" xml:"password" form:"password"`
	Captcha  string `json:"captcha" xml:"captcha" form:"captcha"`
}

type loginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Token   string `json:"token"`
}

type codeStructure struct {
	Value       string
	ExpireAt    time.Time
	RedirectUri string
	Used        bool
	UserID      string
}

type identBody struct {
	GrantType   string `json:"grant_type" xml:"grant_type" form:"grant_type"`
	Code        string `json:"code" xml:"code" form:"code"`
	RedirectUri string `json:"redirect_uri" xml:"redirect_uri" form:"redirect_uri"`
	ID          string `json:"client_id" xml:"client_id" form:"client_id"`
	Secret      string `json:"client_secret" xml:"client_secret" form:"client_secret"`
}

type identResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	User    User   `json:"user"`
}

type captchaResponse struct {
	Success bool `json:"success"`
}
