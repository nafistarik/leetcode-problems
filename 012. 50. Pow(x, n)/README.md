> make a beautiful notion note on this: give problem statement and all my approaches : both right and wrong! and before each an every approach there should be the thinking what is given here!
> 

## Problem Statement

Implement pow(x, n), which calculates `x` raised to the power `n` (i.e., `x^n`).

**Example 1:**

```
Input: x = 2.00000, n = 10
Output: 1024.00000

```

**Example 2:**

```
Input: x = 2.10000, n = 3
Output: 9.26100

```

**Example 3:**

```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25

```

### Constraints:

- `100.0 < x < 100.0`
- `2^31 <= n <= (2^31) - 1`
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- `10^4 <= x^n <= 10^4`

## My Approaches

### Approach 1: Using Built-in Function

**Thinking:** The simplest solution is to use JavaScript's built-in Math.pow function.

```jsx
var myPow = function(x, n) {
    return Math.pow(x, n);
};

```

❌ **Problem:** This isn't accepted because I need to build the implementation myself.

### Approach 2: Simple Iteration (Positive Powers Only)

**Thinking:** I can multiply x by itself n times to calculate the power.

```jsx
var myPow = function(x, n) {
    let res = 1;
    for (let i = 0; i < n; i++) {
        res *= x;
    }
    return res;
};

```

❌ **Problem:** This only works for positive values of n, but the problem requires handling negative exponents as well.

### Approach 3: Handling Both Positive and Negative Powers

**Thinking:** For negative exponents, I can divide 1 by x repeatedly instead of multiplying.

```jsx
var myPow = function(x, n) {
    let res = 1;
    if (n > 0) {
        for (let i = 0; i < n; i++) {
            res *= x;
        }
    } else {
        for (let i = 0; i > n; i--) {
            res /= x;
        }
    }
    return res;
};

```

❌ **Problem:** This approach exceeds the time limit for large values of n (which can be as large as 2^31-1), making it inefficient.

### Approach 4: Binary Exponentiation - First Attempt

**Thinking:** I can use binary exponentiation to reduce the time complexity from O(n) to O(log n). This is based on the principle I learned in HSC ICT - we can break down exponentiation by using the properties of powers.

```jsx
var myPow = function(x, n) {
    let res = 1;
    while (n > 0) {
        if (n % 2 !== 0) {
           res = res * x;
        }
        x = x * x;
        n = n / 2;
    }
    return res;
};

```

❌ **Problem:** This creates an infinite loop! When dividing odd numbers by 2, we get decimal values (e.g., 5/2 = 2.5) which never reach 0.

### Approach 5: Binary Exponentiation - With Floor Division

**Thinking:** I need to use integer division to avoid the infinite loop issue.

```jsx
var myPow = function(x, n) {
    let res = 1;
    while (n > 0) {
        if (n % 2 !== 0) {
           res = res * x;
        }
        x = x * x;
        n = Math.floor(n / 2);
    }
    return res;
};

```

❌ **Problem:** This is working for positive but still doesn't handle negative exponents.

### Approach 6: Binary Exponentiation - Handling Positive and Negative Powers Separately

**Thinking:** I'll use different loops for positive and negative exponents.

```jsx
var myPow = function(x, n) {
    let res = 1;
    if (n > 0) {
        while (n > 0) {
            if (n % 2 !== 0) {
               res = res * x;
            }
            x = x * x;
            n = Math.floor(n / 2);
        }
    } else {
        while (n < 0) {
            if (n % 2 !== 0) {
               res = res / x;
            }
            x = x * x;
            n = Math.ceil(n / 2);
        }
    }
    return res;
};

```

✅ **Success:** This solution is accepted, but there's a more elegant approach.

### Approach 7: Binary Exponentiation - Final Optimized Solution

**Thinking:** Instead of handling positive and negative exponents separately, I can convert negative exponents to positive ones using the mathematical property: x^(-n) = 1/(x^n). I'll also add handling for edge cases.

```jsx
var myPow = function(x, n) {
    // Handle edge cases
    if (x === 1 || n === 0) return 1;
    if (x === 0) return 0;

    let res = 1;

    // Convert negative exponent to positive
    if (n < 0) {
        n = -n;
        x = 1 / x;
    }

    // Binary exponentiation
    while (n > 0) {
        if (n % 2 !== 0) {
            res = res * x;
        }
        x = x * x;
        n = Math.floor(n / 2);
    }

    return res;
};

```

✅ **Final Solution:** This optimal solution uses binary exponentiation with O(log n) time complexity and handles all the required cases elegantly.