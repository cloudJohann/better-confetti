import { LightningElement, api } from 'lwc';

export default class FabulousFlowEditor extends LightningElement {

    _inputVariables = [];

    @api
    get inputVariables() {
        return this._inputVariables;
    }

    // Set a field with the data that was stored from the flow.
    // This data includes the public volume property of the custom volume      
    // component.
    set inputVariables(variables) {
        this._inputVariables = variables || [];
    }

    get confetti() {
        const param = this.inputVariables.find(({name}) => name === 'confetti');
        return param && param.value;
    }    

    get music() {
        const param = this.inputVariables.find(({name}) => name === 'music');
        return param && param.value;
    }        


    handleConfettiTypeChange(event) {
        if (event && event.detail) {
            const newValue = event.detail.value;
            const valueChangedEvent = new CustomEvent(
                'configuration_editor_input_value_changed', {
                     bubbles: true,
                     cancelable: false,
                     composed: true,
                     detail: {
                         name: 'confetti',
                         newValue,
                         newValueDataType: 'String'
                     }
                }
            );
            this.dispatchEvent(valueChangedEvent);
        }
    }

    handleMusicTypeChange(event) {
        if (event && event.detail) {
            const newValue = event.detail.value;
            const valueChangedEvent = new CustomEvent(
                'configuration_editor_input_value_changed', {
                     bubbles: true,
                     cancelable: false,
                     composed: true,
                     detail: {
                         name: 'music',
                         newValue,
                         newValueDataType: 'String'
                     }
                }
            );
            this.dispatchEvent(valueChangedEvent);
        }
    }

    get confettiTypeOptions () {
        return [{label: null, value: null},
                {label: 'Helau', value: 'Helau'},
                {label: 'Doppelfontaene', value:'Doppelfontaene'},
                {label: 'Feuerwerk', value:'Feuerwerk'},
                {label: 'Kanone', value:'Kanone'},
                {label: 'Regen', value:'Regen'},
                {label: 'Nana Rain', value:'Nana Rain'},
                {label: 'Jonis Unicorns', value:'Jonis Unicorns'},
                {label: 'Diamonds are forever', value:'Diamonds are forever'},
                {label: 'Irina the Cat', value:'Irina the Cat'},
                {label: 'You are on fire', value:'You are on fire'},
                {label: 'Pigs are in the Air', value:'Pigs are in the Air'},
                {label: 'Raibow J', value:'Rainbow J'}];
    }  
    
    get musicTypeOptions () {
        return [{label: null, value: null},
                {label: 'Dodododo', value: 'Dodododo'},
                {label: 'Schloss', value: 'Schloss'},
                {label: 'Bratenfreude', value: 'Bratenfreude'},
                {label: 'SonntagNachmittag', value: 'SonntagNachmittag'},
                {label: 'Up', value: 'Up'},
                {label: 'Sommer', value: 'Sommer'},
                {label: 'Schlosseingang', value: 'Schlosseingang'},
                {label: 'Preisverleihung', value: 'Preisverleihung'},
                {label: 'Heimkommen', value: 'Heimkommen'}];
    }    

}