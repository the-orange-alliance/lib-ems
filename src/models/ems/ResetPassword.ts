import IPostableObject from "../IPostableObject";

export default class ResetPassword implements IPostableObject {
  private _oldPassword: string;
  private _newPassword: string;
  private _newPasswordVerifier: string;

  constructor() {
    this._oldPassword = "";
    this._newPassword = "";
    this._newPasswordVerifier = "";
  }

  public toJSON(): object {
    return {
      old_password: this.oldPassword,
      new_password: this.newPassword,
      new_password_verifier: this.newPasswordVerifier,
    };
  }

  public fromJSON(json: any): ResetPassword {
    const t: ResetPassword = new ResetPassword();
    t.oldPassword = json.old_password;
    t.newPassword = json.new_password;
    t.newPasswordVerifier = json.new_password_verifier;
    return t;
  }

  get oldPassword(): string {
    return this._oldPassword;
  }

  set oldPassword(value: string) {
    this._oldPassword = value;
  }

  get newPassword(): string {
    return this._newPassword;
  }

  set newPassword(value: string) {
    this._newPassword = value;
  }

  get newPasswordVerifier(): string {
    return this._newPasswordVerifier;
  }

  set newPasswordVerifier(value: string) {
    this._newPasswordVerifier = value;
  }
}
