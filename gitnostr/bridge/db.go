package bridge

import (
	"database/sql"
	"fmt"

	"github.com/spearson78/gitnostr"
	_ "modernc.org/sqlite"
)

func OpenDb(dbFilePath string) (*sql.DB, error) {

	resolvedDbFilePath, err := gitnostr.ResolvePath(dbFilePath)
	if err != nil {
		return nil, fmt.Errorf("open db resolve %v : %w", dbFilePath, err)
	}

	db, err := sql.Open("sqlite", resolvedDbFilePath)
	if err != nil {
		return nil, fmt.Errorf("open db %v : %w", resolvedDbFilePath, err)
	}

	_, err = db.Exec("PRAGMA busy_timeout = 500;")
	if err != nil {
		return nil, fmt.Errorf("open db set timeout %v : %w", resolvedDbFilePath, err)
	}

	err = applyMigrations(db)
	if err != nil {
		return nil, err
	}

	return db, nil
}
