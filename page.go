package main

import (
	"io/ioutil"
	"os"
	"strings"
)

var authpage = ""

func renderAuthPage() {
	page, err := ioutil.ReadFile("./page/auth.html")
	check(err)

	authpage = strings.ReplaceAll(string(page), "{{captcha_id}}", os.Getenv("CAPTCHA_SITE_KEY"))
}
