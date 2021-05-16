let db = window.openDatabase("myDB", "1.0", "testDBName", 2 * 1024 * 1024)


function createTable() {

    try {

        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS TEST (id,name,date)")
        })

    } catch (error) {
        console.log("error", error)
    }

}

function createRecord() {
    try {
        db.transaction(function (tx) {
            const date = Date.now()
            tx.executeSql("INSERT INTO TEST (id,name,date) VALUES (1,'Furkan','16.05.2021')")
            tx.executeSql("INSERT INTO TEST (id,name,date) VALUES (?,?,?)", [2, 'Ulutas', date])
        })
    } catch (error) {
        console.log("error", error)
    }
}


function readRecords() {
    try {
        db.transaction(function (tx) {
            // [] içerisine where şartı yazılır.
            tx.executeSql("SELECT * FROM TEST", [], (tx, result) => {
                console.log('result', result.rows)
                for (let index = 0; index < result.rows.length; index++) {
                    console.log(`item`, result.rows.item(index))
                }

            })
        })
    } catch (error) {
        console.log("error", error)
    }
}

function readRecordsByID(id) {
    try {
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM TEST where id=?", [id], (tx, result) => {
                console.log('result', result.rows)
                for (let index = 0; index < result.rows.length; index++) {
                    console.log(`item`, result.rows.item(index))
                }

            })
        })
    } catch (error) {
        console.log("error", error)
    }
}

function deleteRecordByID(id) {
    try {

        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM TEST WHERE id=?", [id], (tx, result) => {
                console.log(result, result.rowsAffected)
            })
        })

    } catch (error) {
        console.log("error", error)
    }
}

function updateRecordByID(id) {
    try {

        db.transaction(function (tx) {
            tx.executeSql("UPDATE TEST SET id=?, name=?, date=? WHERE id=?", [30, "Test", Date.now(), id], (tx, result) => {
                console.log(result, result.rowsAffected)
            })
        })

    } catch (error) {
        console.log("error", error)
    }
}