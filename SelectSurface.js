/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */

define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');

    /**
     * A Famo.us surface in the form of an HTML Select element.
     *   This extends the Surface class.
     *
     * @class SelectSurface
     * @extends Surface
     * @constructor
     * @param {Object} [options] overrides of default options
     * @param {string} [options.placeholder] placeholder text hint that describes the expected value of an <Select> element
     * @param {string} [options.value] value of option
     * @param {string} [options.name] specifies the name of Select
     * @param {Object} [options.opts] specifies a list of options (eg: [["Famo","1"],["us","2"]])
     */


    function SelectSurface(options) {
        this._placeholder = options.placeholder || '';
        this._value       = options.value || '';
        this._name        = options.name || '';
        this.opts     = options.opts || [];
        this.buildOpts(options);
        Surface.apply(this, arguments);
        this.on('click', this.focus.bind(this));
    }
    SelectSurface.prototype = Object.create(Surface.prototype);
    SelectSurface.prototype.constructor = SelectSurface;

    SelectSurface.prototype.elementType = 'select';
    SelectSurface.prototype.elementClass = 'famous-surface';

    /**
     * Set placeholder text.  Note: Triggers a repaint.
     *
     * @method setPlaceholder
     * @param {string} str Value to set the placeholder to.
     * @return {SelectSurface} this, allowing method chaining.
     */
    SelectSurface.prototype.setPlaceholder = function setPlaceholder(str) {
        this._placeholder = str;
        this._contentDirty = true;
        return this;
    };

    /**
     * Focus on the current input, pulling up the keyboard on mobile.
     *
     * @method focus
     * @return {SelectSurface} this, allowing method chaining.
     */
    SelectSurface.prototype.focus = function focus() {
        if (this._currTarget) this._currTarget.focus();
        return this;
    };

    /**
     * Blur the current input, hiding the keyboard on mobile.
     *
     * @method focus
     * @return {SelectSurface} this, allowing method chaining.
     */
    SelectSurface.prototype.blur = function blur() {
        if (this._currTarget) this._currTarget.blur();
        return this;
    };

    /**
     * Set the value of Select.
     *   Note: Triggers a repaint next tick.
     *
     * @method setValue
     * @param {string} str Value to set the main Select value to.
     * @return {SelectSurface} this, allowing method chaining.
     */
    SelectSurface.prototype.setValue = function setValue(str) {
        this._value = str;
        this._contentDirty = true;
        return this;
    };
    
    /**
     * Get the value of the inner content of the Select (e.g. the entered text)
     *
     * @method getValue
     * @return {string} value of element
     */
    SelectSurface.prototype.getValue = function getValue() {
        if (this._currTarget) {
            return this._currTarget.value;
        }
        else {
            return this._value;
        }
    };
    
    /**
     * Set the name attribute of the element.
     *   Note: Triggers a repaint next tick.
     *
     * @method setName
     * @param {string} str element name
     * @return {SelectSurface} this, allowing method chaining.
     */
    SelectSurface.prototype.setName = function setName(str) {
        this._name = str;
        this._contentDirty = true;
        return this;
    };

    /**
     * Get the name attribute of the element.
     *
     * @method getName
     * @return {string} name of element
     */
    SelectSurface.prototype.getName = function getName() {
      return this._name;
    };

    /**
     * Get the options of the Select
     *
     * @method getOpts
     * @return {Object} the options
     */
    SelectSurface.prototype.getOpts = function getOpts() {
        if (this._currTarget) {
            return this._currTarget.opts;
        }
        else {
            return this.opts;
        }
    };
    
    /**
     * Set the options of the element.
     *   Note: Triggers a repaint next tick.
     *
     * @method setOpts
     * @param {Object} a list of options (eg: [["Famo","1"],["us","2"]])
     * @return {SelectSurface} this, allowing method chaining.
     */
    SelectSurface.prototype.setOpts = function setOpts(opts) {
        this.opts = opts;
        this.buildOpts(this);
        this._contentDirty = true;
        return this;
    };

    /**
     *  Assigns the placeholder option disabled and selected to the content
     *  property. Also adds the options.  
     *    
     *
     * @private
     * @method buildOpts
     * @param {Object} target object for assign the content;
     */
    SelectSurface.prototype.buildOpts = function buildOpts(target) {
        var content = '';
        if(this._placeholder !== ''){
            content = '<option value="" disabled selected>' +
                            this._placeholder + '</option>';
        }
        for(var i = 0;i < this.opts.length; i++) {
            content += '<option value="' + this.opts[i][1] + '">' +
                             this.opts[i][0] + '</option>';
        }
        target.content = content;
    };

    module.exports = SelectSurface;
});