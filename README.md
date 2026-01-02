# lastMemory

**lastMemory.js** is a lightweight, jQuery-style JavaScript library that remembers where a user was before being redirected, and restores them back to that page. It is perfect for improving **user experience** in multi-step flows like authentication, payments, and forms.

Think of it as **“navigation memory”** that preserves a user’s intent.

---

## Features

* Remember the current page or a specific URL
* Restore the user to the last page automatically
* Clear memory after restoring
* Optional expiration time for memory
* Works in any web project (vanilla JS, PHP, static pages)
* Safe for private browsing or storage-restricted environments
* jQuery-style alias `$last` for simplicity

---

## CDN Installation

You can include **lastMemory** via CDN. No build tools required.

### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/gh/adorts/lastMemory@main/lastMemory.js"></script>
```

Once loaded, you can access the library as:

```js
lastMemory.remember();
$last.remember(); // jQuery-style alias
```

---

## API Reference

### `remember(options)`

Stores the current page (or a provided URL) in memory.

```js
$last.remember({
  url: "/pricing", // optional, default = current page
  expires: 10,     // optional, expiration in minutes, default = 10
  once: true       // optional, default = true
});
```

* **url**: The URL to remember (default: `window.location.href`)
* **expires**: How long memory should be valid (in minutes)
* **once**: If `true`, memory is cleared after `goBack()` (default)

---

### `goBack(options)`

Redirects the user back to the remembered page.

```js
$last.goBack({ fallback: "/dashboard" });
```

* **fallback**: URL to redirect if no memory exists (default: `/`)

---

### `has()`

Check if there is a valid memory stored.

```js
if ($last.has()) {
  console.log("User has pending navigation memory");
}
```

Returns `true` or `false`.

---

### `clear()`

Manually clears the memory.

```js
$last.clear();
```

---

## Example Usage

### Scenario: User must login before payment

**Step 1: Remember the page before redirect**

```js
document.getElementById("buyPlan").onclick = function() {
  $last.remember(); // remember current page
  location.href = "/login.html"; // redirect user to login
};
```

**Step 2: Restore after login**

```js
// On login success page
$last.goBack({ fallback: "/dashboard.html" });
```

**Step 3: Optional check**

```js
if ($last.has()) {
  console.log("User has a previous page they were navigating from");
}
```

---

## Why Use lastMemory?

* Prevents users from losing context during forced redirects
* Perfect for payment, login, or multi-step flows
* Works without heavy frameworks
* jQuery-style simplicity for quick integration

---

## Compatibility

* Vanilla JavaScript, no dependencies
* Works in modern browsers
* Safe fallback in private browsing / storage restrictions

---

## License

**MIT License** – free to use, modify, and distribute. 

---
