// DAO DATA ACCESS OBJECT
import { User } from "./user-model.js";
class UserDao {
    list() {
        return [
            new User('Vini', 'vini@gmail.com'),
            new User('Manu', 'manu@gmail.com'),
        ]
    }
}
export {
    UserDao
}