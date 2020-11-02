// TODO : support quadratics via possible
// function given by "rate"

// TODO : clear change handlers when invoking "clear"

/**
 *
 * @param {Object} param0
 * @param {Number} param0.value
 * @param {Number} param0.target
 * @param {Number} param0.rate how much to increment per second
 * @param {Function} param0.onChange callback handler which takes simple
 *                      argument to take an action
 *                      whenever a value has actually been
 *                      detected as changed
 */
function ValueEntry({ value, target=value, rate=0, onChange }) {

    if(typeof value != 'number') {
        throw new Error('"value" of ShiftingValuesMap entry must be a numeric');
    }

    if(typeof target != 'number') {
        throw new Error('"target" of ShiftValuesMap entry must be a numeric');
    }


    if(typeof rate != 'number') {
        throw new Error('"rate" of ShiftValuesMap entry must be a numeric');
    }

    if(rate <= 0) {
        throw new Error(
            'a value entry passed to ShiftingValuesMap ' +
            'must have a "rate" greater than zero!'
        );
    }

    this.value = value;
    this.target = target;
    this.rate = rate;
    this.onChange = onChange || undefined;

    return this;
}

/**
 *
 * @param {Number} deltaTime time in ms
 */
ValueEntry.prototype.tick = function tick(deltaTime) {
    const prevValue = this.value;
    if(this.value != this.target) {
        if(this.rate > 0 && this.value < this.target) {
            this.value += (this.rate * deltaTime)/1000;

            // correct exceeded target
            if(this.value > this.target) {
                this.value = this.target;
            }
        }

        if(this.rate > 0 && this.value > this.target) {
            this.value -= ((this.rate * deltaTime)/1000);

            // correct exceeded target
            if(this.value < this.target) {
                this.value = this.target;
            }
        }
    }

    // fire a callback to take action

    if(this.onChange && prevValue != this.value) {
        this.onChange(this.value);
    }
};

/**
 * a convenient Map extension class that supports
 * shifting values for all numerics given
 * with a delta time according to a collection
 * of Nodes in the form of
 * {target, rate, value}
 *
 * NOTE: we implement not as an actual map
 * because there are issues with extending
 * native Map classes in Chrome as well as Babel
 *
 * @param {Number} deltaTime time in ms
 */
export default class ShiftingValueMap {
    constructor(...args) {
        this.map = new Map(args);

        const that = this;

        // give this class the same interface as it's
        // Map contained (but we must do this indirectly
        // as Map prototype cannot be called on non or extended
        // Maps directly)

        Object.getOwnPropertyNames(Map.prototype).forEach( key => {
            this[key] = function map(...fnArgs) {
                return that.map[key](...fnArgs);
            };
        });
    }

    /**
     *
     * @param {*} deltaTime
     */
    tick(deltaTime) {
        for(const [namespace, valueEntry] of this.map) {
            valueEntry.tick(deltaTime);
        }
    }

    static ValueEntry = ValueEntry;
}
