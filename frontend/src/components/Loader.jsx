import { Spinner } from "react-bootstrap";


const Loader = () => {
    return (
        <>
            <Spinner animation="border" role="status" style={{
                width: "40px",
                height: "40px",
                margin: "auto",
                color: "blue",
                // backgroundColor: "red",
                display: "block"
            }} >


            </Spinner>
        </>
    )
}

export default Loader