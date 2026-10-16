export default interface registerFormData {
    name: string
    username: string
    email: string
    dateOfBirth: string
    gender: 'male' | 'female'
    password: string
    rePassword: string
}