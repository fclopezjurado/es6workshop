import HttpClient from '../services/HttpClient';
import {API_BASE_URI, GET_EMPLOYEES_PATH} from '../config/constants';
import Modal from './Modal';

class Base {
  constructor() {
    this.httpClient = new HttpClient();
    this.modal = new Modal();
    this.onInit();
  }

  onInit() {
    this.getEmployees();
  }

  getEmployees() {
    const url = `${API_BASE_URI}${GET_EMPLOYEES_PATH}`;

    this.httpClient.get(url)
      .then((response) => this.printEmployees(response.data))
      .catch((error) => {
        if (error.response) {
          this.modal.setModal(error.response.data, error.response.status);
        } else if (error.request) {
          this.modal.setModal(error.responseText, error.status);
        } else {
          this.modal.setModal(error.message);
        }

        this.modal.show();
      });
  }

  printEmployees(employees) {
    const table = document.querySelector('.table-hover');

    employees.forEach((employee) => {
      const row = document.createElement('tr');

      for (let attribute in employee) {
        if (employee.hasOwnProperty(attribute)) {
          const cell = document.createElement('td');
          cell.classList.add('text-center');
          cell.innerText = employee[attribute];
          row.appendChild(cell);
        }
      }

      table.appendChild(row);
    });
  }
}

export default Base;
