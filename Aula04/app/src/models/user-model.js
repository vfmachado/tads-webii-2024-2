class User {
    constructor(name, email, password, createdAt) {
        this.name = name;
        this.email = email;
        this.password = password;
        // if (createdAt) {
        //     this.createdAt = createdAt;
        // } else {
        //     this.createdAt = Date.now();
        // }

        this.createdAt = createdAt ?? Date.now();
    }
}

export {
    User
}