# **Move Zeroes: Algorithm Analysis**

## **1. First Approach: Two Pointers from Ends**

```jsx
var moveZeroes = function(nums) {
    let i = 0;
    let j = nums.length-1;
    let temp;
    while (i <= j){
        if(nums[j]===0){
            j--;
        } else if (nums[i]===0){
            temp = nums[i];
            nums[i]=nums[j];
            nums[j]=temp;
            i++;
            j--;
        } else {
            i++;
        }
    }
};

```

### **✅ Pros:**

- **O(n) Time Complexity** (single pass).
- **O(1) Space Complexity** (in-place swaps).
- **Moves zeros to the end**.

### **❌ Cons:**

- **Breaks relative order** of non-zero elements.
- **Example:**
    - Input: `[0,1,0,3,12]`
    - Output: `[12,1,3,0,0]` (❌ `1,3,12` order is broken).

### **Why It Fails?**

- Swapping with the **last element** disrupts the original sequence of non-zero numbers.

---

## **2. Second Approach: Adjacent Swapping (Failed Attempt)**

```jsx
var moveZeroes = function(nums) {
    let j = 1;
    let temp;
    for (let i = 0; i < nums.length; i++){
        if(nums[i]===0 && nums[j]!==0){
            temp = nums[i];
            nums[i] = nums[j];
            nums[j]=temp;
            i--;
        } else if(nums[i]===0 && nums[j]===0){
            j++;
        }
    }
};

```

### **✅ What It Tries to Do?**

- Uses **two pointers (`i` and `j`)**.
- Swaps `0` with the next non-zero (`nums[j]`).
- If both `nums[i]` and `nums[j]` are `0`, increments `j` to find a non-zero.

### **❌ Why It Fails?**

1. **Infinite Loop Risk:**
    - `i--` causes re-processing of the same index.
    - Example: `[0,0,1]` → gets stuck in a loop.
2. **`j` Goes Out of Bounds:**
    - If `j` exceeds `nums.length`, `nums[j]` becomes `undefined`.
3. **Order Not Guaranteed:**
    - Multiple `0`s cause `j` to skip ahead, missing some swaps.

---

## **3. Optimal Solution (Snowball Technique)**

```jsx
var moveZeroes = function(nums) {
    let j = 0;
    let temp;
    for(let i = 0; i<nums.length; i++){
        if (nums[i]!==0){
            temp = nums[i];
            nums[i]=nums[j];
            nums[j]=temp;
            j++;
        }
    }
};

```

### **✅ Why It Works?**

1. **`j` Tracks the Position for Next Non-Zero**
    - Always points to where the next non-zero should go.
2. **Swaps Non-Zeros Forward**
    - If `nums[i]` is non-zero, it swaps with `nums[j]`.
3. **Maintains Relative Order**
    - Non-zero elements are moved left **in their original sequence**.

### **🚀 Example Walkthrough (Input: `[0,1,0,3,12]`)**

| **Step** | **i** | **nums[i]** | **j** | **Action** | **Array State** |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | `0` | 0 | Skip (zero) | `[0,1,0,3,12]` |
| 2 | 1 | `1` | 0 | Swap `nums[1]` & `nums[0]` | `[1,0,0,3,12]` |
| 3 | 2 | `0` | 1 | Skip (zero) | `[1,0,0,3,12]` |
| 4 | 3 | `3` | 1 | Swap `nums[3]` & `nums[1]` | `[1,3,0,0,12]` |
| 5 | 4 | `12` | 2 | Swap `nums[4]` & `nums[2]` | `[1,3,12,0,0]` |

### **🔥 Key Advantages**

✔ **Single Pass (O(n) Time)**

✔ **In-Place (O(1) Space)**

✔ **Preserves Non-Zero Order**

✔ **Handles All Edge Cases**

---

## **Final Thoughts**

| **Approach** | **Time** | **Space** | **Order Preserved?** | **Works?** |
| --- | --- | --- | --- | --- |
| **Two Pointers (Start & End)** | O(n) | O(1) | ❌ No | ❌ Fails |
| **Adjacent Swapping** | O(n) | O(1) | ❌ No | ❌ Fails |
| **Optimal (Snowball Swap)** | O(n) | O(1) | ✅ Yes | ✅ Perfect |

### **Recommendation**

**Use the Snowball Technique (3rd Approach)** for:

- **Efficiency** (single pass).
- **Correctness** (preserves order).
- **Simplicity** (easy to understand).

**Now you know why the first two fail and why the third one works!** 🚀