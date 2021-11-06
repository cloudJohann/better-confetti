import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';


export default class SendConfettiToColleague extends LightningElement {

    userId;
    confettiName;
    selectedConfettiName;
    messageText;

    get confettiOptions() {
        return [
            { label: 'Helau', value: 'Helau' },
            { label: 'Rainbow J', value: 'Rainbow J' },
            { label: 'Doppelfontaene', value: 'Doppelfontaene' },
            { label: 'Feuerwerk', value: 'Feuerwerk' },
            { label: 'Kanone', value: 'Kanone' },
            { label: 'Regen', value: 'Regen' },
            { label: 'Nana Rain', value: 'Nana Rain' },
            { label: 'Rainbow J', value: 'Rainbow J' },
            { label: 'Jonis Unicorns', value: 'Jonis Unicorns' },
            { label: 'Diamonds are forever', value: 'Diamonds are forever' },
            { label: 'Irina the Cat', value: 'Irina the Cat' },
            { label: 'Diamonds are forever', value: 'Diamonds are forever' },
            { label: 'Pigs are in the air', value: 'Pigs are in the air' },

        ];
    }



    nameChangedHandler(event){
        this.userId = event.target.value;
    }
    confettiChanged(event){
        this.confettiName = event.target.value;
    }   
    messageTextChanged(event){
        this.messageText = event.target.value;

    }
    
    createFabulousConfettiMessage(){
        var fields = {'Confetti_Type__c' : this.confettiName, 'Target_User_Id__c' : this.userId, 'Message_Text__c': this.messageText};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Fabulous_Confetti_Message__c', fields};
        // LDS method to create record.
        createRecord(objRecordInput).then(response => {
        }).catch(error => {
            console.log('Error: ' +JSON.stringify(error));

        });
    }
    

}