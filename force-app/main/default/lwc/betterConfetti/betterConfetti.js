import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import CONFETTI from '@salesforce/resourceUrl/Confetti';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { isFunction } from './confettiGenerator';


export default class BetterConfetti extends LightningElement {
    @api recordId;
    @api objectApiName;

    @api field;
    @api value;
    @api testMode;
    @api confettiActivated;
    @api confettiType;
    @api musicActivated;
    @api musicType;
    

    get confettiTypeOptions () {
        return [{label: 'New', value:'new'},
        {label: 'Helau', value: 'Helau'}];
    }

    //firework defaults too be cleaned
    count = 200;
    defaults = {
        origin: { y: 0.0 }
    };

    oldFieldValue;

    confettiInitialized = false;
    

    fieldToBeChecked;

    connectedCallback() {
        if(this.fieldToBeChecked == undefined){
            this.fieldToBeChecked = this.objectApiName+'.'+this.field ;
        }
        console.log(this.fieldToBeChecked);
    }

    renderedCallback() {
        if (this.confettiInitialized) {
            return;
        }
        this.confettiInitialized = true;

        Promise.all([
            loadScript(this, CONFETTI ),
        ])
            .then(() => {
                console.log('Confetti loaded');
                            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading Confetti',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }
    


    @wire(getRecord, { recordId: '$recordId', fields: '$fieldToBeChecked'})
    getcontactRecord({ data, error }) {
        console.log('getcontactRecord fired');
        console.log('oldFieldValue: '+this.oldFieldValue);
        console.log('this.fieldToBeChecked: '+this.fieldToBeChecked);
        if(typeof this.fieldToBeChecked === "undefined"){
            console.log('if(typeof this.fieldToBeChecked === undefined');
            return;
        }

        if (data) {
            //compare if value changed and if value changed
            console.log('newFieldValue: '+data);
            console.log(data);

            console.log(data.fields[this.field].value);
            const newValue = data.fields[this.field].value;

            if(this.oldFieldValue != newValue && this.oldFieldValue != null){
                if(newValue.toLowerCase() == this.value.toLowerCase()){
                    console.log('field value changed and criteria fulfilled');
                    this.fireConfetti(); 
                }
            }

            this.oldFieldValue = newValue;


        } else if (error) {
            console.error('ERROR => ', JSON.stringify(error)); // handle error properly
        }

    }

    onChangeConfettiType(event){
        this.confettiType=event.detail.value;
        console.log(this.confettiType);
    }

    testConfetti(){
        console.log('testConfetti')
        this.fireConfetti()
    }

    fireConfetti(){
        if(this.confettiType=="Helau") this.confettiHelau();
        if(this.confettiType=="School Pride") this.schoolPride();
        if(this.confettiType=="Fireworks") this.fireworks();
        if(this.confettiType=="Basic Canon") this.basicCanon();
        if(this.confettiType=="Surprise Celebration") this.surpriseCelebration();


    }

    confettiHelau() {
        this.fireRealistic(0.9, 0.7);
        this.fireRealistic(0.5, 0.7);
        this.fireRealistic(0.1, 0.7); 
    }



    fireRealistic(xCordinate, yCordinate){
        this.fire(0.25, {
          spread: 26,
          startVelocity: 55,
          origin: { x: xCordinate ,y: yCordinate },
          
          
        });
        this.fire(0.2, {
          spread: 60,
            origin: { x: xCordinate, y: yCordinate },
    
        });
        this.fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          origin: { x: xCordinate, y: yCordinate },
    
        });
        this.fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
                        origin: { x: xCordinate, y: yCordinate },
    
        });
        this.fire(0.1, {
          spread: 120,
          startVelocity: 45,
                        origin: { x: xCordinate, y: yCordinate },
    
        });
    }

    fire(particleRatio, opts) { 
        window.confetti(Object.assign({}, this.defaults, opts, {
            particleCount: Math.floor(this.count * particleRatio)
        }));
    }

    buttonClick(){

        isFunction('test');
    }
}