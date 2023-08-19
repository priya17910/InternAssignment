import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import '../App.css';


// INTERFACE FOR THE API URL
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const SecondPageComponent1: React.FC = () => {

    // SETTING UP THE STATE TO USE IN DATAGRID
    const [posts, setPosts] = useState<Post[]>([]);

    // GETTING API URL THROUGH ENV FILE
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;


    // TO GET DATA FROM API URL ON LOADING OF THE COMPONENT
    useEffect(() => {
        axios.get(api_url)
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // PREPARING SKELETON FOR THE DATAGRID
    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'USER ID', width: 150, headerClassName: 'bold-header', headerAlign: 'center'},
        { field: 'id', headerName: 'ID', width: 100, headerClassName: 'bold-header', headerAlign: 'center' },
        { field: 'title', headerName: 'TITLE', width: 300, headerClassName: 'bold-header', headerAlign: 'center' },
        { field: 'body', headerName: 'BODY', width: 400, headerClassName: 'bold-header', headerAlign: 'center' },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Second Page Component 1</h2>
            <DataGrid
            rows={posts} columns= {columns}

            // APPLYING PAGINATION
            initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            />
        </div>
    );
};

export default SecondPageComponent1;