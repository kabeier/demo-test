import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



export default function LoginPage() {
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const handleSubmit=(event)=>{
        event.preventDefault()
        if (username.trim()){
            console.log("logging in user")
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
                onChange={(e)=>setUsername(e.target.value)}
                placeholder="Enter Your User name"
            />
            <Button type="submit">
                Login
            </Button>

        </Form.Group>

    </Form>
  )
}