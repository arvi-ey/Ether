export default interface User {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    _id?: string
}
export interface Signin {
    email: string,
    password: string
}