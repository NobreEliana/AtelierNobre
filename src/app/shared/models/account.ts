export class Account {
    id: string;
    companyId: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    created: Date;
    updated: Date;
    isVerified: boolean;
    jwtToken: string;
    refreshJwtToken: string;
}

export class LoginDTO {
    email: string;
    password: string;

    static getLogin(login: LoginDTO): Account {

        var _login: Account = new Account();
        _login.email = login.email;
        _login.password = login.password;

        return _login;
    }
}
