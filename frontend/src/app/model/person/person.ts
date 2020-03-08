import { Course } from '../course/course';

export class Person {
    public id: string;
    public name: string;
    public lastname: string;
    public address: string;
    public telephone: number;
    public correo: string;
    public courses_list: Course[];

    constructor(){}
}