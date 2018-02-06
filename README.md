
## Object empty values recursive remover

Small utility that cleans up object recursively. It works with objects with any level of nesting, and removes objects that have any of the following value:

 1.  "" /empty string/
 2. null
 3. undefined
 4. [] - empty array 
For example, given the following object:
```json
const cleaner = require('node-object-cleaner');
    let obj = {
      test: [{
        shouldBeRemoved: {
          shouldBeRemovedToo: {
            shouldBeRemovedToo: [{
              shouldBeRemovedToo: {
                shouldBeRemovedToo: []
              }
            }]
          }
        }
      },
      {
        shouldNotBeRemoved: {
          shouldNotBeRemoved: {
            shouldNotBeRemoved: true
          }
        }
      }
    
      ],
      shouldRemove: {
        removedValue: null
      },
      shouldRemain: {
        shouldRemainToo: {
          shouldRemainToo: [1]
        }
      }
    }
    //clean the above object
    cleaner(obj);
```
In the above example, the end result should be an object with two keys: shouldNotBeRemoved, and shouldRemain.