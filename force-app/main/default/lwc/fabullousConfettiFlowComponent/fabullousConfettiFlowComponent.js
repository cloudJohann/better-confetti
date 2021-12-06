import { LightningElement, api } from 'lwc';
import {FlowAttributeChangeEvent, FlowNavigationNextEvent} from 'lightning/flowSupport';

export default class FabullousConfettiFlowComponent extends LightningElement {

    @api confetti;
    @api music;


    handleConfettiInitialized(){
      if(this.confetti){
        this.template.querySelector('c-fire-confetti-component').fireConfetti(this.confetti);       
      }

      if(this.music){
        this.template.querySelector('c-fire-confetti-component').playMusic(this.music);

      }
    }    
}