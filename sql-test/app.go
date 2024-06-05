package main
 
import (
	"os"
	sql "database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
)

type Alumno struct {
	legajo int
	nombre string
	apellido string
}

type AlumnoMateria struct {
	legajo int
	nombre, apellido, nombre_materia string
}

func main() {
	db := openDbConnection()
	defer db.Close()

	rows := getAllAlumnos(db)
	defer rows.Close()
	printRowsData(rows)

	row := getAlumnoByID(db, 2)
	printRow(row)

	if len(os.Args) < 2 {
		log.Fatal("USAGE : <%v> <MATERIA>", os.Args[0])
	}
	materia := os.Args[1]
	alumnos := getAlumnosByMateria(db, materia)
	defer alumnos.Close()

	var a AlumnoMateria

	for alumnos.Next() {
		err := alumnos.Scan(&a.legajo, &a.nombre, &a.apellido, &a.nombre_materia)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(a)
	}
}

func openDbConnection() *sql.DB {
	db, err := sql.Open("postgres", "user=postgres host=localhost dbname=bedelia sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func getAllAlumnos(db *sql.DB) *sql.Rows {
	// Get all records from table alumne 
	rows, err := db.Query(`SELECT * FROM alumne;`)
	if err != nil {
		log.Fatal(err)
	}
	return rows
}

func getAlumnoByID(db *sql.DB, id int) *sql.Row{
	row := db.QueryRow(`SELECT * FROM alumne WHERE legajo = $1;`, id)
	return row
}

func getAlumnosByMateria(db *sql.DB, materia string) *sql.Rows {
	rows, err := db.Query(`
		SELECT a.*, m.nombre FROM alumne AS a, materia AS m, cursa
		WHERE cursa.legajo_alumno = a.legajo
		AND cursa.codigo_materia = m.codigo
		AND m.nombre = $1;
		`, materia)

	if err != nil {
		log.Fatal(err)
	}

	return rows
}

func printRow(row *sql.Row) {
	var legajo int
	var nombre string
	var apellido string

	err := row.Scan(&legajo, &nombre, &apellido)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Leagajo: %v Nombre Completo: %v %v\n", legajo, nombre, apellido)
}

func printRowsData(rows *sql.Rows) {
	data := []Alumno{}

	var legajo int
	var nombre string
	var apellido string

	for rows.Next() {
		err := rows.Scan(&legajo, &nombre, &apellido)
		if err != nil{
			log.Fatal(err)
		}
		data = append(data, Alumno{legajo, nombre, apellido})
	}

	fmt.Println(data)
}