import { SECONDARY_PLACEHOLDER, PLACEHOLDER } from './core/constants';
export var defaults = {
    tagInput: {
        separatorKeys: [],
        separatorKeyCodes: [],
        maxItems: undefined,
        placeholder: PLACEHOLDER,
        secondaryPlaceholder: SECONDARY_PLACEHOLDER,
        validators: [],
        asyncValidators: [],
        onlyFromAutocomplete: false,
        errorMessages: {},
        theme: '',
        onTextChangeDebounce: 250,
        inputId: undefined,
        inputClass: undefined,
        clearOnBlur: undefined,
        hideForm: undefined,
        addOnBlur: undefined,
        addOnPaste: undefined,
        pasteSplitPattern: ',',
        blinkIfDupe: true,
        removable: true,
        editable: undefined,
        allowDupes: false,
        modelAsStrings: false,
        trimTags: true,
        ripple: true,
        tabIndex: undefined,
        disabled: false,
        dragZone: undefined,
        onRemoving: undefined,
        onAdding: undefined,
        displayBy: 'display',
        identifyBy: 'value',
        animationDuration: {
            enter: "250ms",
            leave: "150ms"
        }
    },
    dropdown: {
        displayBy: 'display',
        identifyBy: 'value',
        appendToBody: true,
        offset: '50 0',
        focusFirstElement: false,
        showDropdownIfEmpty: false,
        minimumTextLength: 1,
        limitItemsTo: undefined,
        keepOpen: true,
        matchingFn: matchingFn
    }
};
function matchingFn(value, target) {
    var targetValue = target[this.displayBy].toString();
    return targetValue && targetValue
        .toLowerCase()
        .indexOf(value.toLowerCase()) >= 0;
}
//# sourceMappingURL=defaults.js.map