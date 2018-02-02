## Object empty values recursive remover

Small utility that cleans up object recursively. It works with objects with any level of nesting, and removes objects that has any of the following value:

 1.  "" /empty string/
 2. null
 3. undefined
 4. [] - empty array
For example, given the following object:
```json
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
        removedValue: []
      },
      shouldRemain: {
        shouldRemainToo: {
          shouldRemainToo: [1]
        }
      }
    }
```
In the above example, the end result should be an object with two keys: shouldRemain, and test /but only one of the children, the other one should be removed/.