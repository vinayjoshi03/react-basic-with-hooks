import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Header from './Header'
import LeftMenuBar from './LeftMenuBar'

const Layout = ({children}) => {
    //const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'block' }}>
            <Box>
                <Header />
            </Box>
            <Box sx={{ display: 'flex' }}>
               {LeftMenuBar()}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, padding:'15px' }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
