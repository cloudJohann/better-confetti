import { LightningElement } from 'lwc';
import BETTERCONFETTI from '@salesforce/resourceUrl/betterConfetti';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import getMyMessagesFromController from '@salesforce/apex/FabulousMessagesController.getnewMessagesForUser';
import userIdFromAPI from '@salesforce/user/Id';

import { confettiHelau_Utils, feuerwerk_Utils, kanone_Utils, Doppelfontaene_Utils, regen_Utils,nanaRain_Utils, flyingPigs_Utils } from 'c/betterConfetti';
import {neonLightEffect, simpleTextEffect } from './rainbowMessageGenerator';

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
        console.log('simpleTextEffect before');
        //neonLightEffect(message);
        simpleTextEffect(message);
        

    }

  
    
    
}