package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/spearson78/gitnostr"
)

type Config struct {
	ConfigDir  string   `json:"-"`
	Relays     []string `json:"relays"`
	PrivateKey string   `json:"privateKey"`
	GitSshBase string   `json:"gitSshBase"`
}

func getConfigFilePath(resolvedConfigDir string) string {
	return filepath.Join(resolvedConfigDir, "git-nostr-cli.json")
}

func LoadConfig(configDir string) (Config, error) {

	resolvedConfigDir, err := gitnostr.ResolvePath(configDir)
	if err != nil {
		return Config{}, fmt.Errorf("load config : %w", err)
	}

	configPath := getConfigFilePath(resolvedConfigDir)

	configFile, err := os.Open(configPath)
	if err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			cfg := Config{
				ConfigDir: configDir,
				Relays:    []string{},
			}
			err = SaveConfig(cfg)
			if err != nil {
				return Config{}, fmt.Errorf("load config initialize : %w", err)
			}
			return cfg, nil
		} else {
			return Config{}, err
		}
	}
	defer configFile.Close()

	cfg := Config{
		ConfigDir: resolvedConfigDir,
	}
	err = json.NewDecoder(configFile).Decode(&cfg)

	return cfg, err
}

func SaveConfig(cfg Config) error {
	resolvedConfigDir, err := gitnostr.ResolvePath(cfg.ConfigDir)
	if err != nil {
		return fmt.Errorf("save config resolve: %w", err)
	}

	err = os.MkdirAll(resolvedConfigDir, 0700)
	if err != nil {
		if errors.Is(err, fs.ErrExist) {
			//Ignore
		} else {
			return fmt.Errorf("save config mkdir: %w", err)
		}
	}

	configPath := getConfigFilePath(resolvedConfigDir)

	configFile, err := os.OpenFile(configPath, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0644)
	if err != nil {
		return fmt.Errorf("save config open : %w", err)
	}
	defer configFile.Close()

	enc := json.NewEncoder(configFile)
	enc.SetIndent("", "    ")
	err = enc.Encode(cfg)
	if err != nil {
		return fmt.Errorf("save config write : %w", err)
	}

	return nil
}
