## Problem Statement Recap

We are given a **sorted array of integers** with duplicates. We need to:

1. Remove duplicates **in-place** (modify the original array).
2. Return the **new length** of the array after removing duplicates.
3. The elements beyond the new length can be anything (they are irrelevant).

---

## Journey of Solving the Problem

### **Approach 1: Using `splice` (Inefficient)**

### Thinking Process:

- Since the array is sorted, duplicates are adjacent.
- We can iterate through the array and remove duplicates using `splice`.
- However, `splice` modifies the array in-place, which can lead to **O(n^2) time complexity** in the worst case.

```jsx
var removeDuplicates = function (nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1); // Remove the duplicate
            i--; // Adjust the index after removal
        }
    }
    return nums.length;
};
```

### Complexity:

- **Time Complexity**: O(n^2) — Because `splice` shifts all elements after the removed element, and this happens in the worst case for every duplicate.
- **Space Complexity**: O(1) — No extra space is used.

### Issues:

- The use of `splice` makes the solution inefficient for large arrays.
- It’s not optimal for the problem constraints.

---

### **Approach 2: Two-Pointer (Flawed Logic)**

### Thinking Process:

- Use two pointers: `k` (tracks the last unique element) and `i` (iterates through the array).
- If a duplicate is found (`nums[k] === nums[i]`), overwrite `nums[k + 1]` with `nums[i + 1]`.
- Otherwise, increment `k`.

```
var removeDuplicates = function (nums) {
    var k = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[k] === nums[i]) {
            nums[k + 1] = nums[i + 1]; // Flawed logic
        } else {
            k++;
        }
    }
    return k + 1;
};
```

### Complexity:

- **Time Complexity**: O(n) — Only one pass through the array.
- **Space Complexity**: O(1) — No extra space is used.

### Issues:

- The logic `nums[k + 1] = nums[i + 1]` is flawed because it skips the current element (`nums[i]`) and directly copies the next element (`nums[i + 1]`).
- This can lead to incorrect results, especially when `i + 1` is out of bounds or when there are multiple duplicates.

### Example Walkthrough:

For `nums = [1, 1, 2, 3]`:

- After the first iteration, `nums = [1, 2, 2, 3]` (incorrectly skips `nums[1]`).
- The final result is `[1, 2, 2, 3]`, which is wrong.

---

### **Approach 3: Two-Pointer (Correct Logic)**

### Thinking Process:

- Use two pointers: `k` (tracks the last unique element) and `i` (iterates through the array).
- If a new unique element is found (`nums[k] !== nums[i]`), move it to the next position (`nums[k + 1]`) and increment `k`.
- This ensures that all unique elements are moved to the front of the array.

```
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
```

### Complexity:

- **Time Complexity**: O(n) — Only one pass through the array.
- **Space Complexity**: O(1) — No extra space is used.

### Why It Works:

- The `k` pointer ensures that only unique elements are kept at the front of the array.
- The `i` pointer scans the array for new unique elements.
- This approach modifies the array in-place and meets the problem requirements.

### Example Walkthrough:

For `nums = [1, 1, 2, 3]`:

- After the first iteration, `nums = [1, 1, 2, 3]` (no change).
- After the second iteration, `nums = [1, 2, 2, 3]` (`nums[2]` is moved to `nums[1]`).
- After the third iteration, `nums = [1, 2, 3, 3]` (`nums[3]` is moved to `nums[2]`).
- The final result is `[1, 2, 3, 3]` with a new length of `3`.

---

### **Key Takeaways**

1. **Initial Approach**:
    - Using `splice` is intuitive but inefficient due to its O(n) time complexity for each removal.
    - Avoid modifying the array in a way that requires shifting elements repeatedly.
2. **Flawed Two-Pointer Approach**:
    - Skipping elements or overwriting incorrectly can lead to wrong results.
    - Always ensure that the logic handles all edge cases.
3. **Optimal Two-Pointer Approach**:
    - Use two pointers to track unique elements and scan the array.
    - Move unique elements to the front of the array in-place.
    - This approach is efficient and meets the problem constraints.

---

### **Final Thoughts**

The journey from the initial approach to the optimal solution teaches us:

- **Think about time and space complexity** before implementing a solution.
- **Test edge cases** to ensure the logic works for all scenarios.
- **Refine the logic iteratively** to arrive at the most efficient solution.