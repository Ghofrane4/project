import { makeAutoObservable } from "mobx";

class AboutUsStore {
  BannerDescription = "";
  BannerImage = null;
  BannerTitle = "";
  Description = "";
  Title = "";
  Exist= false

  constructor() {
    makeAutoObservable(this);
  }

  updateBannerDescription(newDescription) {
    this.BannerDescription = newDescription;
  }

  updateBannerTitle(newTitle) {
    this.BannerTitle = newTitle;
  }

  updateBannerImage(newImage) {
    this.BannerImage = newImage;
  }

  updateDescription(newDescription) {
    this.Description = newDescription;
  }

  updateTitle(newTitle) {
    this.Title = newTitle;
  }
  updateExist(newexist) {
    this.Exist = newexist;
  }
  updateAboutUs(data) {
    this.BannerDescription = data.BannerDescription ?? this.BannerDescription;
    this.BannerImage = data.BannerImage ?? this.BannerImage;
    this.BannerTitle = data.BannerTitle ?? this.BannerTitle;
    this.Description = data.Description ?? this.Description;
    this.Title = data.Title ?? this.Title;
    this.Exist = data.Exist ?? this.Exist;
  }
  resetAboutUs() {
    this.BannerDescription = "";
    this.BannerImage = null;
    this.BannerTitle = "";
    this.Description = "";
    this.Title = "";
    this.Exist = false;
  }
}

const aboutUsStore = new AboutUsStore();
export default aboutUsStore;
