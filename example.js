const cleaner = require('./index');

let objToClean = {
    test: {
        cleanThis: [{}, {}, {
            something: {
                nothing: null
            }
        }]
    },
    test: {
        doNotCleanThis: [{}, {
            thisShouldBePreserverdToo: true
        }, {
            something: {
                nothing: 'something'
            }
        }]
    }
}

console.log(cleaner(objToClean))