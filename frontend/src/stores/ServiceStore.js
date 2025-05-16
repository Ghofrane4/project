import { makeAutoObservable } from "mobx";

class ServiceStore {
  Title = "";
  Description = "";
  icon = "";
  services = [];

  constructor() {
    makeAutoObservable(this);
  }

  addService = (service) => {
    this.services.push(service);
  };

  removeService = (id) => {
    this.services = this.services.filter(service => service.id !== id);
  };

  getServices(services) {    
    this.services = services;
  }

  editService = (id, updatedService) => {
    const index = this.services.findIndex(service => service.id === id);
    if (index !== -1) {
      this.services[index] = { ...this.services[index], ...updatedService };
    }
  };

  updateAboutUs(data) {
    this.icon = data.icon;
    this.Description = data.Description;
    this.Title = data.Title;
  }
}

const serviceStore = new ServiceStore();
export default serviceStore;
