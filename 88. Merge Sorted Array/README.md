### **Problem Statement**

We are given two sorted arrays, `nums1` and `nums2`, where `nums1` has extra space to accommodate all elements from `nums2`. Our goal is to merge them into a single sorted array in-place.

---

## **📌 Initial Approach: Basic JS Functions**

```jsx
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m);
    nums2.splice(n);
    nums1.push(...nums2);
    nums1.sort((a, b) => a - b);
}
```

### ❌ **Problems with this Approach**

✅ Simple and easy to implement.

❌ **Sorting is unnecessary** because both arrays are already sorted.

❌ **Time Complexity:** `O((m + n) log (m + n))` due to the sorting step.

❌ **Space Complexity:** `O(log (m + n))` (sorting uses extra space).

---

## **📌 Approach 2: Using Merge Sort Technique (Returns New Array)**

```jsx
function merge(left, right) {
    var result = [];
    var i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i), right.slice(j));
}
```

### ❌ **Problems with this Approach**

✅ Uses the **merge technique** from Merge Sort.

❌ **Returns a new array instead of modifying `nums1` in place**.

❌ **Space Complexity:** `O(m + n)` (because of the new `result` array).

---

## **📌 Approach 3: In-Place Merge (Using Extra Left Array)**

```jsx
var merge = function(nums1, m, nums2, n) {
    var left = nums1.slice(0, m);
    nums1.length = 0;
    nums2.length = n;
    var i = 0, j = 0;

    while (i < left.length && j < nums2.length) {
        if (left[i] < nums2[j]) {
            nums1.push(left[i++]);
        } else {
            nums1.push(nums2[j++]);
        }
    }
    nums1.push(...left.slice(i), ...nums2.slice(j));
};
```

### ❌ **Problems with this Approach**

✅ Works in-place by mutating `nums1`.

❌ **Extra Space:** `O(m)`, because we create a separate `left` array.

❌ **Inefficient Mutation:** Clears `nums1`, then repopulates it.

---

## **📌 Approach 4: Shifting Elements Instead of Extra Array**

```jsx
var merge = function(nums1, m, nums2, n) {
    nums1.length = m;
    nums2.length = n;
    var i = 0, j = 0;

    while (i < m + n && j < n) {
        if (nums1[i] <= nums2[j]) {
            i++;
        } else {
            nums1[i + 1] = nums1[i];  // Shift elements
            nums1[i] = nums2[j];      // Insert new element
            j++;
        }
    }
    nums1.length = m + n;
};
```

### ❌ **Problems with this Approach**

✅ Uses element shifting to insert elements.

❌ **Shifting elements is inefficient**: `O(m + n)`.

❌ **Undefined values appear at the end, requiring trimming.**

---

## **✅ Optimal Approach: Two Pointers from the Back**

```jsx
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
};
```

### 🎯 **Why This is the Best Approach?**

✅ **Time Complexity:** `O(m + n)` (linear time, no sorting needed).

✅ **Space Complexity:** `O(1)` (in-place modification).

✅ **No extra arrays or shifting needed.**

✅ **Efficient merging from the back, avoiding unnecessary element movements.**

---

## **🔗 Final Thoughts**

1. **Brute Force (Sorting after merging):** `O((m + n) log (m + n))` ❌
2. **Merge Sort-Based (New Array):** `O(m + n)` but needs extra space ❌
3. **Using Extra Left Array:** `O(m + n)`, `O(m)` space ❌
4. **Element Shifting:** `O(m + n)`, inefficient ❌
5. **✅ Best Approach – Two Pointers from the Back:** `O(m + n)`, `O(1)` ✅

🚀 **Conclusion:** The two-pointer approach is the most efficient way to solve the problem in-place without extra space!