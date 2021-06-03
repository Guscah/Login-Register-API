const bcrypt = require("bcryptjs");

class AppDatabaseManager {
    fetchUserByEmail(username){
        return db.query("SELECT * FROM users where username = ?", username).then(rows => {
            return rows;
        });
    }

    doRegister(register){
        return db.query("INSERT INTO users (name, email, username, password, hp) VALUES (?, ?, ?, ?, ?)", [
            register.name,
            register.email,
            register.username,
            register.password,
            register.hp
        ]);
    }
}

module.exports = AppDatabaseManager