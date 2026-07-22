import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function BackButton() {
    const navigate = useNavigate()

  return (
    <Button
    variant="outline-light"
    size="sm"
    aria-label="Go back"
    title="Go back"
    onClick={()=> navigate(-1)}
    > ← </Button>
  )
}