const Binar = require('./binar');
const Car = require('./car.example');
class App {
  constructor() {
      this.searchCar = document.getElementById('search-btn');
      this.driver = document.getElementById('input-driver');
      this.date = document.getElementById('input-date');
      this.time = document.getElementById('input-time');
      this.passangers = document.getElementById('input-amount');
      this.carContainer = document.getElementById('cars-container');
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  async init() {
      await this.load();

      const validateInputs = () => {
          const date = this.date.value.trim();
          const time = this.time.value.trim();
          const driver = this.driver.value.trim();

          // Check input whether exist or not
          if (driver && date && time) this.searchCar.removeAttribute('disabled');
          else this.searchCar.setAttribute('disabled', true);
      };

      // Validate input when inputs are changing
      this.driver.addEventListener('input', validateInputs);
      this.date.addEventListener('input', validateInputs);
      this.time.addEventListener('input', validateInputs);

      // Call validate input function
      validateInputs();

      // Do filterCar function if search button is clicked
      this.searchCar.onclick = this.filterCar;
  }

  filterCar = () => {
      const driver = this.driver.value;
      const date = this.date.value;
      const time = this.time.value;

      const parsedDate = new Date(`${date}T${time}:00.000Z`);

      const carsJSON = localStorage.getItem('CARS');
      const carsData = JSON.parse(carsJSON);

      const res = carsData.filter((car) => car.tipeDriver === driver && new Date(car.availableAt) < parsedDate);

      this.clear();
      Car.init(res);
      this.run();
  };

  run = () => {
      Car.list.forEach((car) => {
          const node = document.createElement('div');
          node.className = 'col-md-4';
          node.innerHTML = car.render();
          this.carContainer.appendChild(node);
      });
  };

  clear = () => {
      this.carContainer.innerHTML = '';
  };
}