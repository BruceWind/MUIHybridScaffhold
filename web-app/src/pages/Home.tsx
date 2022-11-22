import React, { ReactElement, FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Home: FC<any> = (): ReactElement => {

    // const navigate = useNavigate();


    //coponentdidmount
    React.useEffect(() => {
        console.log("componentdidmount");
    }, []);

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Typography variant="h3">Home</Typography>

            {/* <Button onClick={() => navigate("/products")}>
                Go Products
            </Button> */}
        </Box >
    );
};

export default Home;