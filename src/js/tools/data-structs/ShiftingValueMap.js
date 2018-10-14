// TODO : support quadratics via possible
// function given by "rate"

/**
 * 
 * @param {Number} value 
 * @param {Number} target 
 * @param {Number} rate how much to increment per second
 */
function ValueEntry ({ value, target=value, rate=0 }) {
	
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
		throw new Error('a value entry passed to ShiftingValuesMap must have a "rate" greater than zero!');
	}

    this.value  = value;
    this.target = target;
    this.rate   = rate;
}

/**
 * 
 * @param {Number} deltaTime time in ms
 */
ValueEntry.prototype.tick = function(deltaTime) {

	if(this.value != this.target) {
		if(this.rate > 0 && this.value < this.target) {
	    	this.value += (this.rate * deltaTime)/1000;
	    	
	    	// correct exceeded target
	    	if(this.value > this.target) {
	    		this.value = this.target;
	    	}
    	}

    	if(this.rate > 0 && this.value > this.target) {
	    	this.value -= (this.rate * deltaTime/1000);

	    	// correct exceeded target
	    	if(this.value < this.target) {
	    		this.value = this.target;
	    	}
	    }
	}

};

/**
 * a convenient Map extension class that supports
 * shifting values for all numerics given
 * with a delta time according to a collection
 * of Nodes in the form of 
 * {target, rate, value} 
 * 
 * @param {Number} deltaTime time in ms
 */
class ShiftingValueMap extends Map {
    /**
     * 
     * @param {*} deltaTime 
     */
    tick (deltaTime) {
        for(let [namespace, valueEntry] of this) {
            valueEntry.tick(deltaTime);        
        }
    }
}

export default ShiftingValueMap;