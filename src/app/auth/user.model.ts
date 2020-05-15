export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    //sino existe this._tokenExpirationDate
    if ((!this._tokenExpirationDate) || (new Date() > this._tokenExpirationDate)) {
      //this._token= null;
      return null;
    }
    return this._token;
  }

  get fechaExpiracion(){
    if(this._tokenExpirationDate){
      return this._tokenExpirationDate;
    }
    return null;
  }
}
