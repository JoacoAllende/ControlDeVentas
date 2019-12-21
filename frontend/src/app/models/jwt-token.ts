export class JwtToken {

    constructor(accessToken, expireIn) {
        this.accessToken = accessToken;
        this.expireIn = expireIn;
    }

    accessToken: string;
    expireIn: string;
}
