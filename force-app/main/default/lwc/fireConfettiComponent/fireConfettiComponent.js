
import BETTERCONFETTI from '@salesforce/resourceUrl/betterConfetti';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { confettiHelau_Utils, feuerwerk_Utils, kanone_Utils, Doppelfontaene_Utils, regen_Utils,nanaRain_Utils, flyingPigs_Utils } from './confettiGenerator';

import { LightningElement, api } from 'lwc';

export default class FireConfettiComponent extends LightningElement {

    confettiInitialized = false;

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
                const cInitializedEvent = new CustomEvent("confettiinitialized", {
                    detail: "done"
                  });
              
                  // Dispatches the event.
                  this.dispatchEvent(cInitializedEvent);
              
            })
            .catch(error => {
                console.log('Error Loading Confetti Script');

            });
    }    

    @api
    fireConfetti(confettiType){
        console.log('child component: '+confettiType);
        console.log('this.confettiInitialized: '+this.confettiInitialized);

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

    @api
    playMusic(musicType){

        console.log('child component: '+musicType);
        console.log('this.confettiInitialized: '+this.confettiInitialized);

        let playThis = BETTERCONFETTI;
        playThis += '/betterConfetti/music/'+musicType + '.mp3';
        var playSound = new Audio(playThis);
        playSound.play();

    }


}