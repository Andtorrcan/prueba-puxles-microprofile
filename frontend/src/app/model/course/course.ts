import { Hability } from '../hability/hability';

export class Course{
    public id: string;
    public date: string;
    public place: string;
    public qualification: number;
    public habilities_list: Hability[];

    constructor(){}
}