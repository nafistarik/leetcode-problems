# 

# **Majority Element Solution Journey**

## **Initial Thought Process**

### **First Approach: Naive Counting**

**Thinking Before Implementation:**

- "I need to find which number appears most frequently."
- "Let me count occurrences of each element by comparing it with every other element."
- "If any count exceeds n/2, that's our answer."

**Implementation:**

javascript

Copy

```
var majorityElement = function(nums) {
    for (let j = 0; j < nums.length; j++) {
        let count = 0;
        for (let i = j; i < nums.length; i++) {
            if (nums[i] === nums[j]) {
                count++;
                if (count > nums.length / 2) return nums[i];
            }
        }
    }
}
```

**Complexity Review:**

- **Time:** O(n²) - Nested loops make it quadratic (slow for large arrays)
- **Space:** O(1) - Only uses constant extra space
- **Problem:** Too inefficient for n ≤ 50,000 (worst case: ~2.5 billion operations!)

---

### **Second Approach: Sorting**

**Thinking Before Implementation:**

- "If I sort the array, the majority element must occupy the middle position."
- "Since it appears >n/2 times, it will dominate the center."

**Implementation:**

javascript

Copy

```jsx
var majorityElement = function(nums) {
    nums.sort((a,b) => a-b);
    return nums[Math.floor(nums.length/2)];
}
```

**Complexity Review:**

- **Time:** O(n log n) - Due to sorting (faster than O(n²))
- **Space:** O(1) (if sorted in-place) or O(n) (if using merge sort)
- **Problem:** Still not optimal for very large n (follow-up asks for O(n))

---

### **Optimal Approach: Boyer-Moore Voting Algorithm**

**Thinking Before Implementation:**

- "Can we find the majority in one pass without extra memory?"
- "Key Idea: The majority element will survive cancellations with minority elements."
- "Track a candidate and votes—increment for matches, decrement for mismatches."

**Implementation:**

javascript

Copy

```jsx
var majorityElement = function(nums) {
    let candidate = nums[0];
    let votes = 1;

    for (let i = 1; i < nums.length; i++) {
        if (votes === 0) {
            candidate = nums[i];
            votes = 1;
        } else if (nums[i] === candidate) {
            votes++;
        } else {
            votes--;
        }
    }

    return candidate;
}
```

**Complexity Review:**

- **Time:** O(n) - Single pass through the array
- **Space:** O(1) - Only two variables (`candidate` and `votes`)
- **Why It Works:**
    - Majority element appears >n/2 times, so it can't be fully "canceled out."
    - Even if other elements reduce its votes, it will regain leadership.

---

## **Key Takeaways**

1. **Brute Force (O(n²)):**
    - Simple but impractical for large inputs.
2. **Sorting (O(n log n)):**
    - Better, but still not optimal for the follow-up.
3. **Boyer-Moore (O(n), O(1)):**
    - **Best solution** for the problem constraints.
    - Elegant cancellation logic ensures efficiency.

### **Final Verdict**

✅ **Use Boyer-Moore Voting Algorithm** for optimal performance!

🚀 **Efficiency:** Linear time + constant space = perfect for large inputs.