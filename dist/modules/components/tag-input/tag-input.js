var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, forwardRef, HostBinding, Input, Output, EventEmitter, Renderer2, ViewChild, ViewChildren, ContentChildren, ContentChild, TemplateRef, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { TagInputAccessor, listen, constants } from '../../core';
import { DragProvider, OptionsProvider } from '../../core/providers';
import { TagInputForm } from '../../components/tag-input-form/tag-input-form.component';
import { TagInputDropdown, } from '../../components/dropdown/tag-input-dropdown.component';
import { TagComponent } from '../../components/tag/tag.component';
import { animations } from './animations';
var DragEvent = global.DragEvent;
var CUSTOM_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var defaults = forwardRef(function () { return OptionsProvider.defaults.tagInput; });
var TagInputComponent = (function (_super) {
    __extends(TagInputComponent, _super);
    function TagInputComponent(renderer, dragProvider) {
        var _this = _super.call(this) || this;
        _this.renderer = renderer;
        _this.dragProvider = dragProvider;
        _this.separatorKeys = new defaults().separatorKeys;
        _this.separatorKeyCodes = new defaults().separatorKeyCodes;
        _this.placeholder = new defaults().placeholder;
        _this.secondaryPlaceholder = new defaults().secondaryPlaceholder;
        _this.maxItems = new defaults().maxItems;
        _this.validators = new defaults().validators;
        _this.asyncValidators = new defaults().asyncValidators;
        _this.onlyFromAutocomplete = new defaults().onlyFromAutocomplete;
        _this.errorMessages = new defaults().errorMessages;
        _this.theme = new defaults().theme;
        _this.onTextChangeDebounce = new defaults().onTextChangeDebounce;
        _this.inputId = new defaults().inputId;
        _this.inputClass = new defaults().inputClass;
        _this.clearOnBlur = new defaults().clearOnBlur;
        _this.hideForm = new defaults().hideForm;
        _this.addOnBlur = new defaults().addOnBlur;
        _this.addOnPaste = new defaults().addOnPaste;
        _this.pasteSplitPattern = new defaults().pasteSplitPattern;
        _this.blinkIfDupe = new defaults().blinkIfDupe;
        _this.removable = new defaults().removable;
        _this.editable = new defaults().editable;
        _this.allowDupes = new defaults().allowDupes;
        _this.modelAsStrings = new defaults().modelAsStrings;
        _this.trimTags = new defaults().trimTags;
        _this.ripple = new defaults().ripple;
        _this.tabindex = new defaults().tabIndex;
        _this.disabled = new defaults().disabled;
        _this.dragZone = new defaults().dragZone;
        _this.onRemoving = new defaults().onRemoving;
        _this.onAdding = new defaults().onAdding;
        _this.animationDuration = new defaults().animationDuration;
        _this.onAdd = new EventEmitter();
        _this.onRemove = new EventEmitter();
        _this.onSelect = new EventEmitter();
        _this.onFocus = new EventEmitter();
        _this.onBlur = new EventEmitter();
        _this.onTextChange = new EventEmitter();
        _this.onPaste = new EventEmitter();
        _this.onValidationError = new EventEmitter();
        _this.onTagEdited = new EventEmitter();
        _this.isLoading = false;
        _this.listeners = (_a = {},
            _a[constants.KEYDOWN] = [],
            _a[constants.KEYUP] = [],
            _a);
        _this.inputTextChange = new EventEmitter();
        _this.inputTextValue = '';
        _this.appendTag = function (tag, index) {
            if (index === void 0) { index = _this.items.length; }
            var items = _this.items;
            var model = _this.modelAsStrings ? tag[_this.identifyBy] : tag;
            _this.items = items.slice(0, index).concat([model], items.slice(index, items.length));
        };
        _this.createTag = function (model) {
            var trim = function (val, key) {
                return typeof val === 'string' ? val.trim() : val[key];
            };
            return __assign({}, typeof model !== 'string' ? model : {}, (_a = {}, _a[_this.displayBy] = _this.trimTags ? trim(model, _this.displayBy) : model, _a[_this.identifyBy] = _this.trimTags ? trim(model, _this.identifyBy) : model, _a));
            var _a;
        };
        return _this;
        var _a;
    }
    Object.defineProperty(TagInputComponent.prototype, "inputText", {
        get: function () {
            return this.inputTextValue;
        },
        set: function (text) {
            this.inputTextValue = text;
            this.inputTextChange.emit(text);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "tabindexAttr", {
        get: function () {
            return this.tabindex !== undefined ? '-1' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    TagInputComponent.prototype.onRemoveRequested = function (tag, index) {
        var _this = this;
        if (this.onRemoving) {
            this.onRemoving(tag)
                .first()
                .subscribe(function (model) {
                _this.removeItem(model, index);
            });
        }
        else {
            this.removeItem(tag, index);
        }
    };
    TagInputComponent.prototype.onAddingRequested = function (isFromAutocomplete, tag, index) {
        var _this = this;
        if (index === void 0) { index = undefined; }
        if (!tag) {
            return;
        }
        if (this.onAdding) {
            this.onAdding(tag)
                .first()
                .subscribe(function (model) {
                _this.addItem(isFromAutocomplete, model, index);
            });
        }
        else {
            this.addItem(isFromAutocomplete, tag, index);
        }
    };
    TagInputComponent.prototype.isTagValid = function (tag, fromAutocomplete) {
        var _this = this;
        if (fromAutocomplete === void 0) { fromAutocomplete = false; }
        var selectedItem = this.dropdown ? this.dropdown.selectedItem : undefined;
        if (selectedItem && !fromAutocomplete) {
            return;
        }
        var dupe = this.findDupe(tag, fromAutocomplete);
        if (!this.allowDupes && dupe && this.blinkIfDupe) {
            var item = this.tags.find(function (_tag) {
                return _this.getItemValue(_tag.model) === _this.getItemValue(dupe);
            });
            if (!!item) {
                item.blink();
            }
        }
        var isFromAutocomplete = fromAutocomplete && this.onlyFromAutocomplete;
        var assertions = [
            !dupe || this.allowDupes === true,
            this.maxItemsReached === false,
            ((isFromAutocomplete) || this.onlyFromAutocomplete === false)
        ];
        return assertions.filter(function (item) { return item; }).length === assertions.length;
    };
    TagInputComponent.prototype.selectItem = function (item, emit) {
        if (emit === void 0) { emit = true; }
        var isReadonly = item && typeof item !== 'string' && item.readonly;
        if (isReadonly) {
            return;
        }
        this.selectedTag = item;
        if (emit) {
            this.onSelect.emit(item);
        }
    };
    TagInputComponent.prototype.fireEvents = function (eventName, $event) {
        var _this = this;
        this.listeners[eventName]
            .forEach(function (listener) { return listener.call(_this, $event); });
    };
    TagInputComponent.prototype.handleKeydown = function (data) {
        var event = data.event;
        var key = event.keyCode || event.which;
        switch (constants.KEY_PRESS_ACTIONS[key]) {
            case constants.ACTIONS_KEYS.DELETE:
                if (this.selectedTag && this.removable) {
                    var index = this.items.indexOf(this.selectedTag);
                    this.onRemoveRequested(this.selectedTag, index);
                }
                break;
            case constants.ACTIONS_KEYS.SWITCH_PREV:
                this.switchPrev(data.model);
                break;
            case constants.ACTIONS_KEYS.SWITCH_NEXT:
                this.switchNext(data.model);
                break;
            case constants.ACTIONS_KEYS.TAB:
                this.switchNext(data.model);
                break;
            default:
                return;
        }
        event.preventDefault();
    };
    TagInputComponent.prototype.setInputValue = function (value) {
        var control = this.getControl();
        control.setValue(value);
    };
    TagInputComponent.prototype.getControl = function () {
        return this.inputForm.value;
    };
    TagInputComponent.prototype.focus = function (applyFocus, displayAutocomplete) {
        if (applyFocus === void 0) { applyFocus = false; }
        if (displayAutocomplete === void 0) { displayAutocomplete = false; }
        if (this.dragProvider.getState('dragging')) {
            return;
        }
        this.selectItem(undefined, false);
        if (applyFocus) {
            this.inputForm.focus();
            this.onFocus.emit(this.formValue);
        }
    };
    TagInputComponent.prototype.blur = function () {
        this.onTouched();
        this.onBlur.emit(this.formValue);
    };
    TagInputComponent.prototype.hasErrors = function () {
        return this.inputForm && this.inputForm.hasErrors();
    };
    TagInputComponent.prototype.isInputFocused = function () {
        return this.inputForm && this.inputForm.isInputFocused();
    };
    TagInputComponent.prototype.hasCustomTemplate = function () {
        var templates = this.templates;
        var template = templates ? templates.first : undefined;
        var menuTemplate = this.dropdown && this.dropdown.templates ?
            this.dropdown.templates.first : undefined;
        return template && template !== menuTemplate;
    };
    TagInputComponent.prototype.switchNext = function (item) {
        if (this.tags.last.model === item) {
            this.focus(true);
            return;
        }
        var tags = this.tags.toArray();
        var tagIndex = tags.findIndex(function (tag) { return tag.model === item; });
        var tag = tags[tagIndex + 1];
        tag.select.call(tag);
    };
    TagInputComponent.prototype.switchPrev = function (item) {
        if (this.tags.first.model !== item) {
            var tags = this.tags.toArray();
            var tagIndex = tags.findIndex(function (tag) { return tag.model === item; });
            var tag = tags[tagIndex - 1];
            tag.select.call(tag);
        }
    };
    Object.defineProperty(TagInputComponent.prototype, "maxItemsReached", {
        get: function () {
            return this.maxItems !== undefined &&
                this.items.length >= this.maxItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "formValue", {
        get: function () {
            return this.inputForm.value.value;
        },
        enumerable: true,
        configurable: true
    });
    TagInputComponent.prototype.ngOnInit = function () {
        var hasReachedMaxItems = this.maxItems !== undefined &&
            this.items &&
            this.items.length > this.maxItems;
        if (hasReachedMaxItems) {
            this.maxItems = this.items.length;
            console.warn(constants.MAX_ITEMS_WARNING);
        }
        this.editable = this.onlyFromAutocomplete ? false : this.editable;
        this.setAnimationMetadata();
    };
    TagInputComponent.prototype.onDragStarted = function (event, tag, index) {
        event.stopPropagation();
        var item = { zone: this.dragZone, tag: tag, index: index };
        this.dragProvider.setSender(this);
        this.dragProvider.setDraggedItem(event, item);
        this.dragProvider.setState({ dragging: true, index: index });
    };
    TagInputComponent.prototype.onDragOver = function (event, index) {
        this.dragProvider.setState({ dropping: true });
        this.dragProvider.setReceiver(this);
        event.preventDefault();
    };
    TagInputComponent.prototype.onTagDropped = function (event, index) {
        var item = this.dragProvider.getDraggedItem(event);
        if (item.zone !== this.dragZone) {
            return;
        }
        this.dragProvider.onTagDropped(item.tag, item.index, index);
        event.preventDefault();
        event.stopPropagation();
    };
    TagInputComponent.prototype.isDropping = function () {
        return this.dragProvider.getState('dropping') && this.dragProvider.receiver === this;
    };
    TagInputComponent.prototype.ngAfterViewInit = function () {
        this.setUpKeypressListeners();
        this.setupSeparatorKeysListener();
        this.setUpInputKeydownListeners();
        if (this.onTextChange.observers.length) {
            this.setUpTextChangeSubscriber();
        }
        if (this.clearOnBlur || this.addOnBlur) {
            this.setUpOnBlurSubscriber();
        }
        if (this.addOnPaste) {
            this.setUpOnPasteListener();
        }
        if (this.hideForm) {
            this.inputForm.destroy();
        }
    };
    TagInputComponent.prototype.onTagBlurred = function (changedElement, index) {
        this.items[index] = changedElement;
        this.blur();
    };
    TagInputComponent.prototype.trackBy = function (item) {
        return item[this.identifyBy];
    };
    TagInputComponent.prototype.removeItem = function (tag, index) {
        this.items = this.getItemsWithout(index);
        if (this.selectedTag === tag) {
            this.selectItem(undefined, false);
        }
        this.focus(true, false);
        this.onRemove.emit(tag);
    };
    TagInputComponent.prototype.addItem = function (fromAutocomplete, item, index) {
        var _this = this;
        if (fromAutocomplete === void 0) { fromAutocomplete = false; }
        if (index === void 0) { index = undefined; }
        var model = this.getItemDisplay(item);
        var reset = function () {
            _this.setInputValue('');
            _this.focus(true, false);
        };
        var validationFilter = function (tag) {
            var isValid = _this.isTagValid(tag, fromAutocomplete) && _this.inputForm.form.valid;
            if (!isValid) {
                _this.onValidationError.emit(tag);
            }
            return isValid;
        };
        var subscribeFn = function (tag) {
            _this.appendTag(tag, index);
            _this.onAdd.emit(tag);
            if (!_this.dropdown) {
                return;
            }
            _this.dropdown.hide();
            _this.dropdown.showDropdownIfEmpty ? _this.dropdown.show() : undefined;
        };
        Observable
            .of(model)
            .first()
            .filter(function () { return model.trim() !== ''; })
            .map(function () { return item; })
            .map(this.createTag)
            .filter(validationFilter)
            .subscribe(subscribeFn, undefined, reset);
    };
    TagInputComponent.prototype.setupSeparatorKeysListener = function () {
        var _this = this;
        var useSeparatorKeys = this.separatorKeyCodes.length > 0 || this.separatorKeys.length > 0;
        listen.call(this, constants.KEYDOWN, function ($event) {
            var hasKeyCode = _this.separatorKeyCodes.indexOf($event.keyCode) >= 0;
            var hasKey = _this.separatorKeys.indexOf($event.key) >= 0;
            if (hasKeyCode || hasKey) {
                $event.preventDefault();
                _this.onAddingRequested(false, _this.formValue);
            }
        }, useSeparatorKeys);
    };
    TagInputComponent.prototype.setUpKeypressListeners = function () {
        var _this = this;
        listen.call(this, constants.KEYDOWN, function ($event) {
            var isCorrectKey = $event.keyCode === 37 || $event.keyCode === 8;
            if (isCorrectKey &&
                !_this.formValue &&
                _this.items.length) {
                _this.tags.last.select.call(_this.tags.last);
            }
        });
    };
    TagInputComponent.prototype.setUpInputKeydownListeners = function () {
        var _this = this;
        this.inputForm.onKeydown.subscribe(function (event) {
            _this.fireEvents('keydown', event);
            if (event.key === 'Backspace' && _this.formValue === '') {
                event.preventDefault();
            }
        });
    };
    TagInputComponent.prototype.setUpOnPasteListener = function () {
        var input = this.inputForm.input.nativeElement;
        this.renderer.listen(input, 'paste', this.onPasteCallback.bind(this));
    };
    TagInputComponent.prototype.setUpTextChangeSubscriber = function () {
        var _this = this;
        this.inputForm.form.valueChanges
            .debounceTime(this.onTextChangeDebounce)
            .subscribe(function () { return _this.onTextChange.emit(_this.formValue); });
    };
    TagInputComponent.prototype.setUpOnBlurSubscriber = function () {
        var _this = this;
        var filterFn = function () {
            return !(_this.dropdown && _this.dropdown.isVisible) && !!_this.formValue;
        };
        this.inputForm
            .onBlur
            .filter(filterFn)
            .subscribe(function () {
            if (_this.addOnBlur) {
                _this.onAddingRequested(false, _this.formValue);
            }
            _this.setInputValue('');
        });
    };
    TagInputComponent.prototype.findDupe = function (tag, isFromAutocomplete) {
        var _this = this;
        var identifyBy = isFromAutocomplete ? this.dropdown.identifyBy : this.identifyBy;
        return this.items
            .find(function (item) {
            return _this.getItemValue(item) === tag[identifyBy];
        });
    };
    TagInputComponent.prototype.onPasteCallback = function (data) {
        var _this = this;
        var text = data.clipboardData.getData('text/plain');
        text.split(this.pasteSplitPattern)
            .map(function (item) { return _this.createTag(item); })
            .forEach(function (item) { return _this.onAddingRequested(false, item); });
        this.onPaste.emit(text);
        setTimeout(function () { return _this.setInputValue(''); }, 0);
    };
    TagInputComponent.prototype.setAnimationMetadata = function () {
        this.animationMetadata = {
            value: 'in',
            params: __assign({}, this.animationDuration)
        };
    };
    return TagInputComponent;
}(TagInputAccessor));
__decorate([
    Input(),
    __metadata("design:type", Array)
], TagInputComponent.prototype, "separatorKeys", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], TagInputComponent.prototype, "separatorKeyCodes", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "secondaryPlaceholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TagInputComponent.prototype, "maxItems", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], TagInputComponent.prototype, "validators", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], TagInputComponent.prototype, "asyncValidators", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onlyFromAutocomplete", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "errorMessages", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "theme", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onTextChangeDebounce", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "inputId", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "inputClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "clearOnBlur", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "hideForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "addOnBlur", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "addOnPaste", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "pasteSplitPattern", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "blinkIfDupe", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "removable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "editable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "allowDupes", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "modelAsStrings", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "trimTags", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TagInputComponent.prototype, "inputText", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "ripple", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "tabindex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TagInputComponent.prototype, "dragZone", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], TagInputComponent.prototype, "onRemoving", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], TagInputComponent.prototype, "onAdding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "animationDuration", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onAdd", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onRemove", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onSelect", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onFocus", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onBlur", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onTextChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onPaste", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onValidationError", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "onTagEdited", void 0);
__decorate([
    ContentChild(TagInputDropdown),
    __metadata("design:type", TagInputDropdown)
], TagInputComponent.prototype, "dropdown", void 0);
__decorate([
    ContentChildren(TemplateRef, { descendants: false }),
    __metadata("design:type", QueryList)
], TagInputComponent.prototype, "templates", void 0);
__decorate([
    ViewChild(TagInputForm),
    __metadata("design:type", TagInputForm)
], TagInputComponent.prototype, "inputForm", void 0);
__decorate([
    ViewChildren(TagComponent),
    __metadata("design:type", QueryList)
], TagInputComponent.prototype, "tags", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TagInputComponent.prototype, "inputTextChange", void 0);
__decorate([
    HostBinding('attr.tabindex'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], TagInputComponent.prototype, "tabindexAttr", null);
TagInputComponent = __decorate([
    Component({
        selector: 'tag-input',
        providers: [CUSTOM_ACCESSOR],
        styleUrls: ['./tag-input.style.scss'],
        templateUrl: './tag-input.template.html',
        animations: animations
    }),
    __metadata("design:paramtypes", [Renderer2,
        DragProvider])
], TagInputComponent);
export { TagInputComponent };
//# sourceMappingURL=tag-input.js.map