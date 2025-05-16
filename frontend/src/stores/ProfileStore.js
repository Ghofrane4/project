import { makeAutoObservable } from "mobx";

class ProfileStore {
user= {
  id: "",
  fullname: "",
  email: "",
  companyName: "",
  companyFunctionality: "",
  phoneNumber: "",
  image: "",
  role: "",
}

  constructor() {
    makeAutoObservable(this);
  }


  updateProfile(data) {
    this.user.id = data?.id ?? this.user.id;
    this.user.email = data?.email ?? this.user.email;
    this.user.phoneNumber = data?.phoneNumber ?? this.user.phoneNumber;
    this.user.fullname = data?.fullname ?? this.user.fullname;
    this.user.companyName = data?.companyName ?? this.user.companyName;
    this.user.companyFunctionality = data?.companyFunctionality ?? this.user.companyFunctionality;
    this.user.role = data?.role ?? this.user.role;
    this.user.image = data?.image ?? this.user.image;
  }
}

const profileStore = new ProfileStore();
export default profileStore;
