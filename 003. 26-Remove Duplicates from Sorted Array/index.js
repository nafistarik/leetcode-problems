var removeDuplicates = function (nums) {
    var k = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[k] !== nums[i]) { // New unique element found
            nums[k + 1] = nums[i]; // Move it to the next position
            k++; // Increment the unique element pointer
        }
    }
    return k + 1; // New length
};