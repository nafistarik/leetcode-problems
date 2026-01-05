## **Problem Statement Simply**

Given a string containing words separated by spaces (which may include multiple spaces between words or at the start/end), return the length of the **last word** in the string.

A **word** is defined as a sequence of non-space characters.

**Examples:**

- `"Hello World"` → `5` (last word is "World")
- `" fly me to the moon "` → `4` (last word is "moon")
- `"a"` → `1` (only word is "a")

---

## **Initial Approaches & Thought Process**

### **Attempt 1: Naive Array Split (Flawed)**

**Thinking:**

*"If I split the string by spaces, the last element should be the last word."*

```jsx
var lengthOfLastWord = function(s) {
    let arr = s.split(" ");
    return arr[arr.length-1].length;
};

```

**Problem:**

- Splitting `" fly me to the moon "` produces `["","","fly","me","","","to","","","the","moon","",""]`
- Empty strings (`""`) from leading/trailing/multiple spaces break this approach.

### **Attempt 2: Filtered Array (Works but Suboptimal)**

**Thinking:**

*"I need to ignore empty strings from the split result."*

```jsx
var lengthOfLastWord = function(s) {
    let arr = s.split(" ").filter(word => word.length > 0);
    return arr[arr.length-1].length;
};

```

**Works but:**

- Uses extra memory (`O(n)`) for the filtered array.
- Still relies on splitting the entire string.

### **Attempt 3: Backward Traversal (Optimized Idea)**

**Thinking:**

*"Instead of splitting, I can traverse the string backward to find the last word directly."*

**First Try (Incorrect):**

```jsx
var lengthOfLastWord = function(s) {
    let j = 0;
    for (let i = s.length-1; i >= 0; i--) {
        if (s[i] == " ") return j;
        j++;
    }
};

```

**Issue:**

Fails for `"   moon  "` because it returns `0` immediately when hitting the first space (without checking if letters were counted).

**Second Try (Better Logic):**

```jsx
var lengthOfLastWord = function(s) {
    let j = 0;
    for (let i = s.length-1; i >= 0; i--) {
        if (s[i] != " ") j++; // Count letters
        else if (j > 0) return j; // Stop after last word ends
    }
};

```

**Why This Works:**

1. **Skips trailing spaces** (continues until a letter is found).
2. **Counts letters backward** until a space appears **after** the word.
3. Multiple trailing spaces (`"moon "` → ignores spaces, counts "moon").

**Why This Doesn’t Work:**

1. **Can’t Handle edge cases**:
    - No spaces (`"a"` → returns nothing ).

---

## **Final Optimized Solution**

### **Pointer-Based (O(1) Space, O(n) Time)**

```jsx
var lengthOfLastWord = function(s) {
    let length = 0;
    for (let i = s.length-1; i >= 0; i--) {
        if (s[i] !== ' ') length++;
        else if (length > 0) return length; // Word ends
    }
    return length; // Case when no spaces exist (e.g., "a")
};

```

### **Key Insights**

1. **Backward Traversal** avoids processing the entire string.
2. **Early Termination** stops after the last word is counted.
3. **No Extra Memory** (unlike array-based methods).

### **Walkthrough Example**

For `s = "   fly me   to   the moon  "`:

1. Skips trailing spaces (positions 13-11).
2. Counts `'n'` (10), `'o'` (9), `'o'` (8), `'m'` (7) → `length = 4`.
3. Hits space at position 6 → returns `4`.

---

## **Lessons Learned**

1. **Edge Cases Matter**: Leading/trailing spaces break naive solutions.
2. **Backward Traversal** is powerful for "last item" problems.
3. **Filtering Arrays Works** but isn’t always optimal.
4. **Early Termination** improves efficiency.