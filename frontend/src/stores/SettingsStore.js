import { makeAutoObservable } from "mobx";

class SettingsStore {
  PrimaryColor = "";
  SecondaryColor = "";
  Logo = null;
  BackgroundImage = null;
  AccueilContentPosition = "center";
  FacebookLink = "";
  InstagramLink = "";
  LinkedinLink = "";
  TiktokLink = "";
  YoutubeLink = "";
  Exist = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Individual update methods for each field
  updatePrimaryColor(newPK) {
    this.PrimaryColor = newPK;
  }

  updateSecondaryColor(newSK) {
    this.SecondaryColor = newSK;
  }

  updateLogo(newLogo) {
    this.Logo = newLogo;
  }

  updateBackgroundImage(newBackgroundImage) {
    this.BackgroundImage = newBackgroundImage;
  }

  updateAccueilContentPosition(newPosition) {
    this.AccueilContentPosition = newPosition;
  }

  updateFacebookLink(newLink) {
    this.FacebookLink = newLink;
  }

  updateInstagramLink(newLink) {
    this.InstagramLink = newLink;
  }

  updateLinkedinLink(newLink) {
    this.LinkedinLink = newLink;
  }

  updateTiktokLink(newLink) {
    this.TiktokLink = newLink;
  }

  updateYoutubeLink(newLink) {
    this.YoutubeLink = newLink;
  }

  updateExist(existStatus) {
    this.Exist = existStatus;
  }

  // Method to update all variables at once
  updateSettings(data) {
    this.PrimaryColor = data.PrimaryColor ?? this.PrimaryColor;
    this.SecondaryColor = data.SecondaryColor ?? this.SecondaryColor;
    this.Logo = data.Logo ?? this.Logo;
    this.BackgroundImage = data.BackgroundImage ?? this.BackgroundImage;
    this.AccueilContentPosition = data.AccueilContentPosition ?? this.AccueilContentPosition;
    this.FacebookLink = data.FacebookLink ?? this.FacebookLink;
    this.InstagramLink = data.InstagramLink ?? this.InstagramLink;
    this.LinkedinLink = data.LinkedinLink ?? this.LinkedinLink;
    this.TiktokLink = data.TiktokLink ?? this.TiktokLink;
    this.YoutubeLink = data.YoutubeLink ?? this.YoutubeLink;
    this.Exist = data.Exist ?? this.Exist;
  }

  // Method to reset all variables to their default values
  resetSettings() {
    this.PrimaryColor = "";
    this.SecondaryColor = "";
    this.Logo = null;
    this.BackgroundImage = null;
    this.AccueilContentPosition = "";
    this.FacebookLink = "";
    this.InstagramLink = "";
    this.LinkedinLink = "";
    this.TiktokLink = "";
    this.YoutubeLink = "";
    this.Exist = false;
  }
}

const settingsStore = new SettingsStore();
export default settingsStore;
