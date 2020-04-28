import { Component, OnInit } from '@angular/core';
import { lists } from './db';
import { chunk } from './util';

const defaultCurrent = 1;
const defaultPageSize = 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-dream-app by kagol';
  defaultCurrent = defaultCurrent;
  pageSize = defaultPageSize;
  total = lists.length;
  dataSource = [];

  ngOnInit() {
    this.dataSource = chunk(lists, this.pageSize)[this.defaultCurrent - 1];
  }

  onChange(current) { // 页码改变
    this.setLists(current, this.pageSize);
  }

  setLists(page, pageSize) {
    this.dataSource = chunk(lists, pageSize)[page - 1];
  }
}

/*
class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal {
  constructor() {
    super('Rhino');
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal('Goat');
console.log('animal name:', animal.name);
let rhino = new Rhino();
let employee = new Employee('Bob');
animal = rhino;
console.log('animal:', animal);
animal = employee;
console.log('animal:', animal);
*/
/*
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string; // 类的属性
  static id: number = 1; // 静态属性，类本身的属性，而不是实例的属性。Employee.id
  constructor(name: string, department: string) {  // 类的构造器（构造函数）
    super(name);
    this.department = department;
  }
  getElevatorPitch() { // 类的方法
    return {
      name: this.name,
      department: this.department
    }
  }
}

let howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
console.log(howard.name);
console.log(howard.department);
let stranger = new Person('Stranger A');
console.log(stranger.name);
console.log(stranger.department);
stranger.name = 'Stranger B';
console.log(stranger.name);
stranger.department = 'Developer';
console.log(stranger.department);
console.log('id:', Employee.id);
*/

/**
 * 类的修饰符总结：
 * private - 外部访问不了+继承的子类也访问不了
 * protected - 外部访问不了，集成的子类可以访问
 * public(default) - 外部可以访问，集成的子类也可以访问
 */

//  abstract class Person { // 抽象类
//    abstract speak(): void; // 必须在派生类中实现
//    walking() {
//      console.log('walking on the road');
//    }
//  }

//  class Male extends Person {
//    speak() {
//      console.log('speak: How are you?');
//    }
//  }

//  let person: Person;
//  person = new Person();
//  person = new Male();
//  person.speak();
//  person.walking();
