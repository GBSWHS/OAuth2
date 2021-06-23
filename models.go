package main

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type Client struct {
	ID          *uint `gorm:"primaryKey"`
	Name        string
	Secret      string
	RedirectUri string
	UsedCount   uint
	OwnerId     string
	Owner       User
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Icon        string
	Description string
	Website     string
}

type S_Client struct {
	ID          uint      `json:"id"`
	Name        string    `json:"name"`
	Icon        string    `json:"icon"`
	Secret      string    `json:"secret"`
	Website     string    `json:"website"`
	Description string    `json:"description"`
	RedirectUri string    `json:"redirect_uri"`
	OwnerId     string    `json:"owner_id"`
	UsedCount   uint      `json:"used_count"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
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

type S_User struct {
	ID          string         `json:"id"`
	Grade       uint           `json:"grade"`
	Class       uint           `json:"class"`
	ClassNumber uint           `json:"class_number"`
	RoomNumber  uint           `json:"room_number"`
	Name        string         `json:"name"`
	Nickname    sql.NullString `json:"nickname"`
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
	User    S_User `json:"user"`
}

type captchaResponse struct {
	Success    bool     `json:"success"`
	Action     string   `json:"action"`
	Score      float64  `json:"score"`
	ErrorCodes []string `json:"error-codes"`
}

type clientResponse struct {
	Success bool     `json:"success"`
	Client  S_Client `json:"client"`
}

type clientsResponse struct {
	Success bool       `json:"success"`
	Clients []S_Client `json:"clients"`
}

type createClientBody struct {
	Name        string `json:"name" xml:"name" form:"name"`
	Icon        string `json:"icon" xml:"icon" form:"icon"`
	RedirectUri string `json:"redirect_uri" xml:"redirect_uri" form:"redirect_uri"`
	Description string `json:"description" xml:"description" form:"description"`
	Website     string `json:"website" xml:"website" form:"website"`
	OwnerId     string `json:"owner_id" xml:"owner_id" form:"owner_id"`
	Captcha     string `json:"captcha" xml:"captcha" form:"captcha"`
}

type createClientResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
