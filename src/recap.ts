const myName = 'Tony';
const myAge = 12;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(23, 20);

class Persona {
  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `Hola, soy ${this.name} y tengo ${this.age} anos`;
  }
}

const Tony = new Persona(25, 'Tony');
const Auri = new Persona(suma(1, 3), 'Auri');
const auriSumm = Auri.getSummary();

console.log(Tony.getSummary());
console.log(auriSumm);
