**When to Use `useNavigate` Instead of `Link`**

`Link` renders a real anchor tag and should be the default choice for navigation — it preserves expected browser behaviors (right-click to open in new tab, cmd/ctrl-click, copy link address) and works even before JS finishes loading.

Use `useNavigate` when navigation needs to happen *after* other logic runs, not as the only response to a click:

* Navigation depends on logic that must run first — e.g. saving data, validating a form, or awaiting an API call before redirecting
* Navigation is triggered by something other than a click — a form `onSubmit`, a keyboard shortcut, a `useEffect`, a timer, or a state store action
* Navigation is conditional based on a runtime check (e.g. redirecting to login if unauthenticated)
* You need `navigate(-1)` to go back, or need to pass `state`/`replace` dynamically

Dynamic routes and button styling are **not** reasons to prefer `useNavigate` — `Link`'s `to` prop accepts a template literal just fine, and most component libraries (including React Bootstrap) support rendering a `Button` as a `Link` via an `as` prop:

```jsx
<Button as={Link} to={`/pokemon/${pokemon.id}`}>Details</Button>
```

**Example — login form:** Here, navigation must wait until the form submits *and* validation passes. There's no anchor tag to click — the trigger is the form's `onSubmit`, and the destination depends on the outcome of logic that runs first. This is a textbook `useNavigate` case:

```jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    // This represents a successful login.
    if (username.trim()) {
      navigate("/")
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
        />
      </Form.Group>

      <Button type="submit">
        Log In
      </Button>
    </Form>
  )
}
```

**In our Pokémon card example:** clicking "Details" does nothing but navigate — there's no logic to run first — so this is a `Link` case:

```jsx
<Button as={Link} to={`/pokemon/${pokemon.id}`}>Details</Button>
```