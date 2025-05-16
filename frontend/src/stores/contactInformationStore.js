import { makeAutoObservable } from "mobx";

class ContactInformationStore {
    NameText = "";
    EmailText = "";
    SubjectText = "";
    MessageText = "";
    ButtonText = "";
    Exist = false

    constructor() {
        makeAutoObservable(this);
    }

    updateNameText(newNameText) {
        this.NameText = newNameText;
    }

    updateEmailText(newValue) {
        this.EmailText = newValue;
    }

    updateSubjectText(newValue) {
        this.SubjectText = newValue;
    }

    updateMessageText(newValue) {
        this.MessageText = newValue;
    }

    updateButtonText(newValue) {
        this.ButtonText = newValue;
    }
    updateExist(newexist) {
        this.Exist = newexist;
    }
    updateContactInformation(data) {
        this.NameText = data.NameText;
        this.EmailText = data.EmailText;
        this.SubjectText = data.SubjectText;
        this.MessageText = data.MessageText;
        this.ButtonText = data.ButtonText;
    }
    resetContactInformation() {
        this.NameText = "";
        this.EmailText = "";
        this.SubjectText = "";
        this.MessageText = "";
        this.ButtonText = ""
        this.Exist = false;
    }
}

const contactInformationStore = new ContactInformationStore();
export default contactInformationStore;
