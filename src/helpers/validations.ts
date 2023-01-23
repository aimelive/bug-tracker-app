export class Validate {
  str: string;
  constructor(str: string) {
    this.str = str;
  }
  username(): string {
    const username: string = this.str;
    if (!username) return "username cannot be empty";
    if (username.length < 5) {
      return "username must have at least (5) chars";
    }
    if (!/[a-zA-Z]/g.test(username)) {
      return "username must contain some letter(s)";
    }
    if (/\d/.test(username[0])) {
      return "username cannot start with number";
    }
    if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(username)) {
      return "username cannot contain special character";
    }
    return "";
  }
  email(): string {
    const email: string = this.str;
    if (!email) return "email cannot be empty";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return "email is invalid";
    }
    return "";
  }
  password(): string {
    const pwd: string = this.str;
    if (!pwd) return "password can not be empty";
    if (pwd.length < 6) {
      return "password must have at least (6) chars";
    }
    if (!/[a-zA-Z]/g.test(pwd)) {
      return "password must contain some letter(s)";
    }
    if (!/\d/.test(pwd)) {
      return "password must contain any number";
    }
    if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pwd)) {
      return "password must contain any special character";
    }
    return "";
  }
}
