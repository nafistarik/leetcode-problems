var removeElement = function(nums, val) {
    let i = 0;
    let j = nums.length - 1;
    while (i <= j) {
        if (nums[i] === val) {
            nums[i] = nums[j];
            j--;
        } else {
            i++;
        }
    }
    return i;
};