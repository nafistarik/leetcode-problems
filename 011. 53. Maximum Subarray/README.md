## Introduction

The Maximum Subarray problem asks us to find a contiguous subarray within an array of numbers that has the largest sum. This is a classic problem in computer science and is often solved using Kadane's algorithm, which provides an efficient O(n) solution.

## Example

Let's work with the following example array:

```
[-2, 1, -3, 4, -1, 2, 1, -5, 4]

```

Our goal is to find the contiguous subarray with the largest sum. In this case, the answer should be `[4, -1, 2, 1]` with a sum of `6`.

## Manual Step-by-Step Explanation

Let's manually find all contiguous subarrays and their sums to understand the problem better:

### First Approach (Brute Force)

We'll examine all possible subarrays and calculate their sums:

Single elements:

- [-2] = -2
- [1] = 1
- [-3] = -3
- [4] = 4
- [-1] = -1
- [2] = 2
- [1] = 1
- [-5] = -5
- [4] = 4

Two-element subarrays:

- [-2, 1] = -1
- [1, -3] = -2
- [-3, 4] = 1
- [4, -1] = 3
- [-1, 2] = 1
- [2, 1] = 3
- [1, -5] = -4
- [-5, 4] = -1

Three-element subarrays:

- [-2, 1, -3] = -4
- [1, -3, 4] = 2
- [-3, 4, -1] = 0
- [4, -1, 2] = 5
- [-1, 2, 1] = 2
- [2, 1, -5] = -2
- [1, -5, 4] = 0

Four-element subarrays:

- [-2, 1, -3, 4] = 0
- [1, -3, 4, -1] = 1
- [-3, 4, -1, 2] = 2
- [4, -1, 2, 1] = 6 (largest sum)
- [-1, 2, 1, -5] = -3
- [2, 1, -5, 4] = 2

... and so on for larger subarrays

The maximum sum is 6, from the subarray [4, -1, 2, 1].

## Building the Logic

### First Approach: Brute Force

Looking at the first solution, I can see it's a brute force approach that:

1. Generates all possible contiguous subarrays
2. Calculates the sum of each subarray
3. Keeps track of the maximum sum found so far

Let's analyze the first approach code:

```jsx
var maxSubArray = function (nums) {
    if (nums.length === 0) return 0;
    let current = [];
    let sum = 0;
    let result = [];
    let resultSum = nums[0];
    const sumArray = (array) => {
        let sum = 0;
        array.forEach((elem) => {
            sum = sum + elem;
        })
        return sum;
    }
    for (let end = nums.length; end > 0; end--) {
        for (let start = 0; start < end; start++) {
            current.length = 0;
            for (let j = start; j < end; j++) {
                current.push(nums[j])
            }
            sum = sumArray(current);
            if (sum > resultSum) {
                resultSum = sum;
                result.length = 0;
                for (let j = 0; j < current.length; j++) {
                    result.push(current[j])
                }
            }
        }
    }
    return resultSum;
};

```

### Time Complexity Analysis of First Approach:

- We have three nested loops: O(n²) for generating all possible start and end combinations, and O(n) for building each subarray and calculating its sum.
- Overall time complexity: O(n³)
- Space complexity: O(n) for storing the current subarray.

This is highly inefficient for large arrays. The main inefficiency is:

1. We're recalculating sums for overlapping subarrays
2. We're storing entire subarrays when we only need their sums
3. We're using three nested loops when the problem can be solved with one

### Second Approach: Improved Solution

The second solution uses Kadane's algorithm, which is much more efficient:

```jsx
function maxSubArray(array) {
    if (array.length === 0) return 0;
    if (array.length === 1) return array[0];
    let maxSum = array[0];
    let currentSum = 0
    for (let index = 0; index < array.length; index++) {
        if (currentSum < 0) currentSum = 0;
        currentSum = currentSum + array[index];
        maxSum = Math.max(currentSum, maxSum)
    }
    return maxSum;
}

```

Let's trace this with our example:

```
[-2, 1, -3, 4, -1, 2, 1, -5, 4]

```

1. Initialize `maxSum = -2`, `currentSum = 0`
2. For index = 0 (value = -2):
    - `currentSum = 0 + (-2) = -2`
    - `maxSum = max(-2, -2) = -2`
    - Since `currentSum < 0`, reset `currentSum = 0`
3. For index = 1 (value = 1):
    - `currentSum = 0 + 1 = 1`
    - `maxSum = max(1, -2) = 1`
4. For index = 2 (value = -3):
    - `currentSum = 1 + (-3) = -2`
    - `maxSum = max(-2, 1) = 1`
    - Since `currentSum < 0`, reset `currentSum = 0`
5. For index = 3 (value = 4):
    - `currentSum = 0 + 4 = 4`
    - `maxSum = max(4, 1) = 4`
6. For index = 4 (value = -1):
    - `currentSum = 4 + (-1) = 3`
    - `maxSum = max(3, 4) = 4`
7. For index = 5 (value = 2):
    - `currentSum = 3 + 2 = 5`
    - `maxSum = max(5, 4) = 5`
8. For index = 6 (value = 1):
    - `currentSum = 5 + 1 = 6`
    - `maxSum = max(6, 5) = 6`
9. For index = 7 (value = -5):
    - `currentSum = 6 + (-5) = 1`
    - `maxSum = max(1, 6) = 6`
10. For index = 8 (value = 4):
    - `currentSum = 1 + 4 = 5`
    - `maxSum = max(5, 6) = 6`

Final `maxSum = 6`, which matches our manual calculation.

### Time Complexity Analysis of Second Approach:

- Only a single pass through the array: O(n)
- Space complexity: O(1), using only two variables

The key insight here is that if the running sum becomes negative, it's better to discard it and start fresh, as any future subarray would have a larger sum without including the negative prefix.

### Third Approach: Kadane's Algorithm with a Subtle Difference

```jsx
function maxSubArray(array) {
    if (array.length === 0) return 0;
    let maxSum = array[0];
    let currentSum = 0
    for (let index = 0; index < array.length; index++) {
        currentSum = currentSum + array[index];
        maxSum = Math.max(currentSum, maxSum);
        if (currentSum < 0) currentSum = 0;
    }
    return maxSum;
}

```

The main difference between the second and third approach is the order of operations:

- Second approach: We check if `currentSum` is negative before adding the current element.
- Third approach: We add the current element first, update `maxSum`, and then check if `currentSum` is negative.

This subtle difference ensures we handle cases with all negative numbers correctly, as the third approach will correctly return the largest (least negative) value when all numbers are negative.

Let's trace the third approach with our example:

```
[-2, 1, -3, 4, -1, 2, 1, -5, 4]

```

1. Initialize `maxSum = -2`, `currentSum = 0`
2. For index = 0 (value = -2):
    - `currentSum = 0 + (-2) = -2`
    - `maxSum = max(-2, -2) = -2`
    - Since `currentSum < 0`, reset `currentSum = 0`
3. For index = 1 (value = 1):
    - `currentSum = 0 + 1 = 1`
    - `maxSum = max(1, -2) = 1`
4. For index = 2 (value = -3):
    - `currentSum = 1 + (-3) = -2`
    - `maxSum = max(-2, 1) = 1`
    - Since `currentSum < 0`, reset `currentSum = 0`
5. For index = 3 (value = 4):
    - `currentSum = 0 + 4 = 4`
    - `maxSum = max(4, 1) = 4`
6. For index = 4 (value = -1):
    - `currentSum = 4 + (-1) = 3`
    - `maxSum = max(3, 4) = 4`
7. For index = 5 (value = 2):
    - `currentSum = 3 + 2 = 5`
    - `maxSum = max(5, 4) = 5`
8. For index = 6 (value = 1):
    - `currentSum = 5 + 1 = 6`
    - `maxSum = max(6, 5) = 6`
9. For index = 7 (value = -5):
    - `currentSum = 6 + (-5) = 1`
    - `maxSum = max(1, 6) = 6`
10. For index = 8 (value = 4):
    - `currentSum = 1 + 4 = 5`
    - `maxSum = max(5, 6) = 6`

The final result is still 6, which matches our expected outcome.

## Clean Approach: Kadane's Algorithm

Here's a clean implementation of Kadane's algorithm:

```jsx
function maxSubArray(nums) {
    // Handle empty array case
    if (nums.length === 0) return 0;

    let maxSum = nums[0];    // Initialize with first element
    let currentSum = nums[0]; // Start the running sum with first element

    // Start from the second element (if any)
    for (let i = 1; i < nums.length; i++) {
        // Key insight: if including the current element gives a better sum
        // than starting fresh with just the current element, keep the running sum
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Update maximum sum if current sum is greater
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

```

This implementation is elegant because:

1. It handles the empty array case
2. It properly handles arrays with all negative numbers
3. It uses a single loop with O(n) time complexity
4. It has O(1) space complexity
5. The logic is clear: at each step, decide whether to extend the current subarray or start a new one

The core insight of Kadane's algorithm is that for each position, we only need to make one simple decision: Should we extend the existing subarray or start a new one? This is determined by comparing the current element with the sum of the current element plus the running sum.

## Key Takeaways

1. **Brute Force Approach**: O(n³) - Examines all possible subarrays.
2. **Kadane's Algorithm**: O(n) - Makes a single pass through the array.
    - Key insight: We reset our running sum when it becomes negative because carrying forward a negative sum would only decrease any future sum.
    - This works because we're looking for the maximum subarray sum, and negative prefixes can only reduce a sum.
3. **Logic Development**:
    - Start by understanding what we're looking for (maximum sum of contiguous elements)
    - Recognize the inefficiency of recalculating overlapping subarrays
    - Realize we only need to track two values: the maximum sum seen so far and the current running sum
4. **Edge Cases**:
    - Empty array: Return 0
    - All negative numbers: Return the largest (least negative) value

Kadane's algorithm is a classic example of how dynamic programming can simplify a seemingly complex problem into a straightforward, efficient solution.