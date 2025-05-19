```jsx
var twoSum = function(nums, target) {
    for(let i = 0; i<nums.length; i++){
        for (let j=i+1; j<nums.length; j++){
            if(nums[i]+nums[j]=== target){
                return [i,j]
            }
        }
    }
};
```

O(n^2)

need better approach which is two pointer!

```jsx
var twoSum = function(nums, target) {
    let j = nums.length - 1;
    let i = 0;
    while (i<j){
        if (nums[i] + nums[j] > target) {
            j--;
        } else if (nums[i] + nums[j] < target) {
            i++;
        } else {
            return [i,j]
        }
    }
};
```