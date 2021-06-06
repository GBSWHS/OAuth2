package main

import (
	"math/rand"
	"strings"
	"time"
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
