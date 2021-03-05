import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import BETTERCONFETTI from '@salesforce/resourceUrl/betterConfetti';
import checkActiveLicense from '@salesforce/apex/checkActiveLicense.currentUserActiveLicense';

import formFactorPropertyName from '@salesforce/client/formFactor'
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { confettiHelau_Utils, feuerwerk_Utils, kanone_Utils, Doppelfontaene_Utils, regen_Utils,nanaRain_Utils } from './confettiGenerator';


export default class BetterConfetti extends LightningElement {
    @api recordId;
    @api objectApiName;

    @api field;
    @api value;
    @api previewActivated;
    @api confettiActivated;
    @api confettiType;
    
    @api musicActivated;
    @api musicType;
    userLicencseActive = false;

    fieldValueChangedAsDefined = false;

    
    

    oldFieldValue;
    confettiInitialized = false;


    get confettiTypeOptions () {
        return [{label: 'Helau', value: 'Helau'},
                {label: 'Doppelfontaene', value:'Doppelfontaene'},
                {label: 'Feuerwerk', value:'Feuerwerk'},
                {label: 'Kanone', value:'Kanone'},
                {label: 'Regen', value:'Regen'},
                {label: 'Nana Rain', value:'Nana Rain'}];
    }


    get musicTypeOptions () {
        return [{label: 'Dodododo', value: 'Dodododo'},
                {label: 'Schloss', value: 'Schloss'},
                {label: 'Bratenfreude', value: 'Bratenfreude'},
                {label: 'SonntagNachmittag', value: 'SonntagNachmittag'},
                {label: 'Up', value: 'Up'},
                {label: 'Sommer', value: 'Sommer'},
                {label: 'Schlosseingang', value: 'Schlosseingang'},
                {label: 'Preisverleihung', value: 'Preisverleihung'},
                {label: 'Heimkommen', value: 'Heimkommen'}];
    }

    get fieldToBeChecked(){
        return this.objectApiName+'.'+this.field ;
    }

    renderedCallback() {
        this.checkUserLicense();
        if (!this.confettiInitialized) {
            this.loadConfettiScript();
        }


    }

    checkUserLicense(){
         //Calls Empty class, if licences expired or suspended access will fail and component will not fire confetti
        checkActiveLicense()
            .then(result => {
                this.userLicencseActive = true;
            })
            .catch(error => {
                console.log(error);
            })
    }

    loadConfettiScript(){
        let betterConfettiScriptResource = BETTERCONFETTI + '/betterConfetti/confettiScript/confetti_script.js';

        Promise.all([
            loadScript(this, betterConfettiScriptResource),
        ])
            .then(() => {
                this.confettiInitialized = true;
            })
            .catch(error => {
                console.log('Error Loading Confetti Script');

            });
    }
    


    @wire(getRecord, { recordId: '$recordId', fields: '$fieldToBeChecked'})
    getcontactRecord({ data, error }) {
        if (data && this.fieldToBeChecked && formFactorPropertyName == 'Large') {
            //compare if value changed and if value changed
            let newValue = '';
            if(data.fields[this.field].value != null){
                newValue = data.fields[this.field].value;
            }
            newValue = newValue.toString();
            if(this.oldFieldValue != newValue && this.oldFieldValue != undefined){
                if(newValue.toLowerCase() == this.value.toLowerCase()){
                    this.fieldValueChangedAsDefined = true;
                    if(this.userLicencseActive){
                        setTimeout(() => {
                        
                            if(this.musicActivated){
                                this.playMusic(); 
                            }      
                            if(this.confettiActivated){
                                this.fireConfetti(); 
                            }
                        },1000);
                    }

              
                }
            }

            this.oldFieldValue = newValue;


        } else if (error) {
        }

    }

    onChangeConfettiType(event){
        this.confettiType=event.detail.value;
    }

    onChangeMusicType(event){
        this.musicType=event.detail.value;
    }


    fireConfetti(){
        if(this.confettiInitialized) {
            if(this.confettiType=="Helau") confettiHelau_Utils();
            if(this.confettiType=="Doppelfontaene") Doppelfontaene_Utils();
            if(this.confettiType=="Feuerwerk") feuerwerk_Utils();
            if(this.confettiType=="Kanone") kanone_Utils();
            if(this.confettiType=="Regen") regen_Utils();
            if(this.confettiType=="Nana Rain") nanaRain_Utils();

        }
    }

    playMusic(){
        let playThis = BETTERCONFETTI;
        playThis += '/betterConfetti/music/'+this.musicType + '.mp3';
        var playSound = new Audio(playThis);
        playSound.play();

    }


}