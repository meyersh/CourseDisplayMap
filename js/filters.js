/* Create a singleton class/object for Filters. */
var filters = {
    /* filter query object. This is directly usable by TAFFY, etc. */
    filterList: {},

    /* Clear all filters. :( */
    clearFilters: function() {
        this.filterList = {};
    },

    /* Add a filter for key -> value (TERM -> 2018/20, etc) */
    addFilter: function(key, value) {
        /* this.filterList[key] must always be a list. So, we either
         * append to it or create a singleton. */
        if (this.filterList[key] && !(value in this.filterList[key])) {
            this.filterList[key].push(value);

        } else {
            this.filterList[key] = [value];
        }
    },

    /* Remove a filter by key -> value */
    deleteFilter: function(key, value) {
        index = this.filterList[key].indexOf(value);

        if (this.filterList[key] && index > -1) {
            console.log("Deleting " + k + "=" + v);

            /* Clear value from key */
            this.filterList[key].splice(index, 1)

            /* Delete all of key if last item */
            if (this.filterList[key].length == 0) {
                delete this.filterList[key];
            }
        }
    },

    /* Return a list all filters in (KEY, VAL) form for building a
     * control panel. */
    listFilters: function() {
        var filters = [];
        for (var k in this.filterList) {
            for (var v in this.filterList[k]) {
                value = this.filterList[k][v];
                console.log("v: " + v)
                filters.push([k, value]);
            }
        }

        return filters;
    },

    /* Return an object representation of the this.filterList object
     * for TAFFY consumption. By default, each clause in a given
     * object is an AND while separate items in a list are ORs, so a
     * list of keys will match any, while an object of multiple keys
     * will reduce. */
    generateQuery: function() {
        var query = [];
        for (var k in this.filterList) {
            var obj = {}
            obj[k] = this.filterList[k];

            query.push(obj);
        }
        return query;
    }

}
