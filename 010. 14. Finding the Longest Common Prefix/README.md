## Problem Statement

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

### Example 1:

```jsx
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

### Example 2:

```jsx
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

### Constraints:

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of only lowercase English letters if it is non-empty.

---

## Brute Force Approach (Initial Thinking)

My first instinct was to check every character of each word and compare them manually:

For `strs = ["flower","flow","flight"]`, we compare:

```jsx
f == f == f  ✅
l == l == l  ✅
o == o == i  ❌ (Mismatch found)
```

Since a mismatch occurs at `o != i`, the prefix is `"fl"`.

We can generalize this as:

- Compare `arr[0][0] == arr[1][0] == arr[2][0]`
- Compare `arr[0][1] == arr[1][1] == arr[2][1]`
- Compare `arr[0][2] == arr[1][2] == arr[2][2]`

This requires **nested loops**:

- **Outer loop:** Iterates through characters of the shortest string.
- **Inner loop:** Iterates through all words, checking the current character.

### Time Complexity:

Since each character in each string is compared, the complexity is **O(N * M)** where:

- `N` is the number of strings.
- `M` is the length of the shortest string.

This is inefficient for large inputs.

---

## Optimized Approach: Sorting Trick

To improve efficiency, I found a technique where sorting the array helps:

1. Sorting places the words with **most differences** at the **first** and **last** positions.
2. The common prefix must be found by comparing **only the first and last words**.

Example:

```jsx
Before Sorting:  ["flower", "flow", "flight"]
After Sorting:   ["flight", "flow", "flower"]
```

Now, we **only compare** `"flight"` and `"flower"`.

### Code Implementation:

```jsx
var longestCommonPrefix = function (strs) {
    strs.sort(); // O(N log N)
    let result = "";
    for (let i = 0; i < strs[0].length; i++) { // O(M)
        if (strs[0][i] == strs[strs.length - 1][i]) {
            result = result.concat(strs[0][i]);
        } else {
            break;
        }
    }
    return result;
};

```

### Issue Found:

The code failed for `strs = [""]` because:

- `strs[0][i]` is `undefined` when `strs[0]` is empty.
- Accessing `undefined` causes errors.

### Fix:

Check if `strs[0][i]` exists before accessing it:

```jsx
var longestCommonPrefix = function (strs) {
    strs.sort(); // O(N log N)
    let result = "";
    for (let i = 0; i < strs[0].length; i++) { // O(M)
        if (strs[0][i] && strs[0][i] == strs[strs.length - 1][i]) {
            result = result.concat(strs[0][i]);
        } else {
            break;
        }
    }
    return result;
};

```

### Final Thoughts

- **Sorting helps** reduce comparisons to just the first and last string.
- **Time Complexity:** `O(N log N) + O(M)` (better than brute force).
- **Edge Case Fix:** Handled empty strings.

✅ **Accepted Solution!** 🚀