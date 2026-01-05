## **Problem Statement Simply**

Given two strings `s` and `t`, check if all characters of `s` appear in `t` **in the same order** (but not necessarily consecutively).

**Example:**

- `s = "abc"`, `t = "ahbgdc"` → `true` (a→b→c appear in order)
- `s = "axc"`, `t = "ahbgdc"` → `false` (a→x not found in order)

---

## **Visual Comparison First**

For `s="abc"`, `t="ahbgdc"`:

```jsx
1. Compare s[0]='a' ↔ t[0]='a' → MATCH! Move both pointers
2. Compare s[1]='b' ↔ t[1]='h' → NO match. Move only t's pointer
3. Compare s[1]='b' ↔ t[2]='b' → MATCH! Move both
4. Compare s[2]='c' ↔ t[3]='g' → NO match. Move only t
5. Compare s[2]='c' ↔ t[4]='d' → NO match. Move only t
6. Compare s[2]='c' ↔ t[5]='c' → MATCH! Done!
```

---

## **First Approach: For-Loop**

```jsx
function isSubsequence(s, t) {
    let i = 0; // s's pointer
    for (let j = 0; j < t.length; j++) {
        if (s[i] === t[j]) i++;
    }
    return i === s.length;
}
```

**What's Happening:**

- Automatically moves through `t` with `j++`
- Only moves `i` when characters match

---

## **Improved Approach: While-Loop**

```jsx
function isSubsequence(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++;
        j++;
    }
    return i === s.length;
}
```

**Why Better?**

1. **No Hidden Increments**: Clearly shows `j++` happens every time
2. **Early Exit**: Stops if we finish checking `s` early
3. **More Control**: Easier to modify for complex cases

---

## **Key Insight**

- The **while-loop** makes the pointer movement **explicit** rather than hiding it in loop syntax
- Both work, but while-loop is **more transparent** about how pointers advance