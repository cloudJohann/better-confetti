import { LightningElement } from 'lwc';
import BETTERCONFETTI from '@salesforce/resourceUrl/betterConfetti';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import getMyMessagesFromController from '@salesforce/apex/FabulousMessagesController.getnewMessagesForUser';
import userIdFromAPI from '@salesforce/user/Id';

import { confettiHelau_Utils, feuerwerk_Utils, kanone_Utils, Doppelfontaene_Utils, regen_Utils,nanaRain_Utils, flyingPigs_Utils } from 'c/betterConfetti';


export default class DisplayMyConfettiMessages extends LightningElement {
    userId = userIdFromAPI;
    confettiInitialized = false;
    timeIntervalInstance;
    getMyConfettiMessagesMethodCalled;
    canvas;

    renderedCallback() {
        if (!this.confettiInitialized) {
            this.loadConfettiScript();
        }
    }


    loadConfettiScript(){
        let betterConfettiScriptResource = BETTERCONFETTI + '/betterConfetti/confettiScript/confetti_script.js';

        Promise.all([
            loadScript(this, betterConfettiScriptResource),
        ])
            .then(() => {
                this.confettiInitialized = true;
                //set timer
                this.startPeriodicRefresh();


            })
            .catch(error => {

            });
    }
    startPeriodicRefresh(){
        this.timeIntervalInstance = setInterval(function() {
            this.getMyConfettiMessages();
        }.bind(this),3000);
    }

    //get my Messages from APEX
    getMyConfettiMessages() {
        if(this.getMyConfettiMessagesMethodCalled){
            return;
        }

        this.getMyConfettiMessagesMethodCalled = true;
        
        getMyMessagesFromController({userId: this.userId} )
            .then(result => {
                this.getMyConfettiMessagesMethodCalled = false;
                if(result.length>0){
                    this.fireConfetti(result[0].Confetti_Type__c);
                    this.displayMessageText(result[0].Message_Text__c)
                }
            })
            .catch(error => {
                this.getMyConfettiMessagesMethodCalled = false;
            });    
        
    }

    
    fireConfetti(confettiType){
        if(this.confettiInitialized) {
            if(confettiType=="Helau") confettiHelau_Utils();
            if(confettiType=="Rainbow J") confettiHelau_Utils();
            if(confettiType=="Doppelfontaene") Doppelfontaene_Utils();
            if(confettiType=="Feuerwerk") feuerwerk_Utils();
            if(confettiType=="Kanone") kanone_Utils();
            if(confettiType=="Regen") regen_Utils();
            if(confettiType=="Nana Rain") regen_Utils('💰');            
            if(confettiType=="Rainbow J") kanone_Utils('🌈');
            if(confettiType=="Jonis Unicorns") Doppelfontaene_Utils('🦄');
            if(confettiType=="Diamonds are forever") feuerwerk_Utils('💎');
            if(confettiType=="Irina the Cat") confettiHelau_Utils('🐈');
            if(confettiType=="You are on fire") regen_Utils('🔥');
            if(confettiType=="Pigs are in the Air") flyingPigs_Utils('🐖');
        }
    }
    
    displayMessageText(message) {
        if (typeof this.canvas === "undefined") {
            // create and initialize a new canvas
            let zIndex = "1";
            this.canvas = this.getCanvas(zIndex);
            document.body.appendChild(this.canvas);
        }

        var ctx = this.canvas.getContext('2d');
        
        var textWidth = ctx.measureText(message).width;
        var lineHeight = 75 * 1.286;
        
        var xPosition = this.canvas.width/2 ;
        var yPosition = this.canvas.height/2;

        ctx.fillStyle = "#009900";
        ctx.fillRect(xPosition, yPosition, textWidth, lineHeight);
        
        ctx.font = '75px arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';    
        ctx.fillStyle = "red";
        ctx.fillText(message, xPosition, yPosition);
        
        setTimeout(function() {
            var ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }.bind(this),3000);
    }

    getCanvas(zIndex) {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = zIndex;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        return canvas;
      }
    
    
}