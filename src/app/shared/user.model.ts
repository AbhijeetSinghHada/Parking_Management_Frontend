export class User {
  constructor(
    public name: string,
    public roles: string[],
    public _tokenExpirationDate: Date,
    private _token: string
  ) {}
  get token() {
    console.log(this._tokenExpirationDate);
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
