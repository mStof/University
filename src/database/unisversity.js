import { getCourses } from "./tables.js";

class Course {
  constructor(course, duration, period) {
    this.course = course;
    this.duration = duration;
    this.period = period;
  }
  showCourse() {
    return {
      course: this.course,
      duration: this.duration,
      period: this.period,
    };
  }
}
class University {
  constructor(name, ranking, link) {
    this.name = name;
    this.ranking = ranking;
    this.link = link;
    this.courses = [];
  }
  async addCourse(coursesList) {
    
    coursesList.forEach(({ name, duration, period }) => {
      if (duration > 1000) {
        duration = duration / 500;
      }
      const courseObj = new Course(name, duration, period)
      this.courses.push(courseObj.showCourse());
    });
  }
  showInfo() {
   return {
     name: this.name,
     ranking: this.ranking,
     link: this.link,
     courses: this.courses,
   }
   
  }
}
export { University }

const Unicamp = new University("Universidade de Campinas", "2º");
Unicamp.addCourse([
  { name: "Ciência da computação", duration: 10, period: "Noturno" },
]);
Unicamp.showInfo()

const USP = new University("Universidade de São Paulo", "1º");
USP.addCourse([
  { curse: "Sistema de informação", duration: undefined, period: "Diurno" },
  { curse: "Ciência da computação", duration: 8, period: "Diurno" },
  { curse: "Engenharia de computação", duration: 10, period: "Diurno" },
]);

const UFABC = new University("UFABC");
UFABC.addCourse([
  { curse: "Ciência da computação", duration: 3280, period: "Diurno" },
  { curse: "Ciência de dados", duration: 2934, period: "Diurno" },
]);