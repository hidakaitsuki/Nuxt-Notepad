export default class Human{
   constructor( private _name:string,
    private _age:number){}

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get age(): number {
        return this._age;
    }

    public set age(age: number) {
        this._age = age;
    }

}