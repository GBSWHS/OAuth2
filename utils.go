package main

import (
	"encoding/json"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/valyala/fasthttp"
)

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func randString(length int) string {
	rand.Seed(time.Now().UnixNano())

	chars := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"0123456789")

	var b strings.Builder

	for i := 0; i < length; i++ {
		b.WriteRune(chars[rand.Intn(len(chars))])
	}

	return b.String() // E.g. "ExcbsVQs"
}

func verifyCaptcha(ip, token string) (result captchaResponse, err error) {
	req := fasthttp.AcquireRequest()
	req.SetRequestURI("https://www.google.com/recaptcha/api/siteverify")
	req.Header.SetMethod("POST")
	req.SetBodyString("secret=" + os.Getenv("CAPTCHA_SECRET_KEY") + "&response=" + token + "&remoteip=" + ip)

	resp := fasthttp.AcquireResponse()
	client := &fasthttp.Client{}
	client.Do(req, resp)

	bodyBytes := resp.Body()
	if err := json.Unmarshal(bodyBytes, &result); err != nil {
		return captchaResponse{}, err
	}

	return result, nil
}
