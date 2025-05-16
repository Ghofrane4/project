import { makeAutoObservable } from 'mobx';

class ContentSectionStore {
    AccueilTitle = undefined;
    AccueilDescription = undefined;
    ProductTitle = undefined;
    ProductDescription = undefined;
    ServiceTitle = undefined;
    ServiceDescription = undefined;
    ContactTitle = undefined;
    ContactDescription = undefined;
    HomeNameLink = undefined;
    AboutUsNameLink = undefined;
    ProductNameLink = undefined;
    ServiceNameLink = undefined;
    ContactNameLink = undefined;
    Exist= false


    constructor() {
        makeAutoObservable(this);
    }

    // Update each attribute individually
    updateAccueilTitle(value) {
        this.AccueilTitle = value;
    }

    updateAccueilDescription(value) {
        this.AccueilDescription = value;
    }

    updateProductTitle(value) {
        this.ProductTitle = value;
    }

    updateProductDescription(value) {
        this.ProductDescription = value;
    }

    updateServiceTitle(value) {
        this.ServiceTitle = value;
    }

    updateServiceDescription(value) {
        this.ServiceDescription = value;
    }

    updateContactTitle(value) {
        this.ContactTitle = value;
    }

    updateContactDescription(value) {
        this.ContactDescription = value;
    }

    updateHomeNameLink(value) {
        this.HomeNameLink = value;
    }

    updateAboutUsNameLink(value) {
        this.AboutUsNameLink = value;
    }

    updateProductNameLink(value) {
        this.ProductNameLink = value;
    }

    updateServiceNameLink(value) {
        this.ServiceNameLink = value;
    }

    updateContactNameLink(value) {
        this.ContactNameLink = value;
    }
    updateExist(newexist) {
        this.Exist = newexist;
      }
    updateContentSection(data) {
        this.AccueilTitle = data.AccueilTitle || "";
        this.AccueilDescription = data.AccueilDescription || "";
        this.ProductTitle = data.ProductTitle || "";
        this.ProductDescription = data.ProductDescription || "";
        this.ServiceTitle = data.ServiceTitle || "";
        this.ServiceDescription = data.ServiceDescription || "";
        this.ContactTitle = data.ContactTitle || "";
        this.ContactDescription = data.ContactDescription || "";
        this.HomeNameLink = data.HomeNameLink || "";
        this.AboutUsNameLink = data.AboutUsNameLink || "";
        this.ProductNameLink = data.ProductNameLink || "";
        this.ServiceNameLink = data.ServiceNameLink || "";
        this.ContactNameLink = data.ContactNameLink || "";
    }
    resetContentSection() {
        this.AccueilTitle = undefined;
        this.AccueilDescription = undefined;
        this.ProductTitle = undefined;
        this.ProductDescription = undefined;
        this.ServiceTitle = undefined;
        this.ServiceDescription = undefined;
        this.ContactTitle = undefined;
        this.ContactDescription = undefined;
        this.HomeNameLink = undefined;
        this.AboutUsNameLink = undefined;
        this.ProductNameLink = undefined;
        this.ServiceNameLink = undefined;
        this.ContactNameLink = undefined;
        this.Exist= false
      }
}

const contentSectionStore = new ContentSectionStore();
export default contentSectionStore;
