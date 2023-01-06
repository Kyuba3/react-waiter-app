import { Button, Card, Container, Nav, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import { NavLink } from "react-router-dom";

const RenderAllTables = () => {
  
  const tables = useSelector(getAllTables)
  
  return (
    <Container className="col-12">
      <Row className="pt-3 d-flex flex-row col-12">
        {tables.map(table => (
            <Card key={table.id} className="d-flex flex-row pt-4 pb-4 px-4 align-items-center border border-top-0 border-end-0 border-start-0 mt-2">
                <Card.Title className="col-1 fs-4"><b>Table</b> {table.id}</Card.Title>
                <Card.Text className="col-9 fs-5 mx-3 pt-2"><b>Status: </b>{table.status}</Card.Text>
                <Nav>
                    <Nav.Link as={NavLink} to={'/table/' + table.id}>
                        <Button variant="primary" className="">Show more</Button>
                    </Nav.Link>
                </Nav>
            </Card>
        ))}
        
      </Row>
    </Container>
  )
}

export default RenderAllTables;