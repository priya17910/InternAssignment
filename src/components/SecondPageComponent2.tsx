import React, { useState } from 'react';
import { List, ListItem, FormControlLabel, Collapse, Checkbox } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// IMPORTING JSON DATA FILE
import departmentsData from '../data';


const SecondPageComponent2: React.FC = () => {

    // STATE FOR HANDLING THE TOGGLE OF DEPARTMENT
    const [open, setOpen] = useState<string[]>([]);

    // STATE FOR HANDLING THE SUB DEPARTMENTS
    const [selected, setSelected] = useState<string[]>([]);
  

    // TOGGLE THE EXPAND AND COLLAPSE OF DEPARTMENTS
    const handleToggle = (department: string) => {
        const newOpen = open.includes(department)
            ? open.filter(dep => dep !== department)
            : [...open, department];
        setOpen(newOpen);
    };


    // CHECKBOX TOGGLE FOR THE SUB DEPARTMENTS
    const handleCheckboxToggle = (item: string) => {
        let newSelected = [...selected];
        if (newSelected.includes(item)) {
            newSelected = newSelected.filter(selectedItem => selectedItem !== item);
        } 
        else {
            newSelected.push(item);
        }
        setSelected(newSelected);
    };
  

    // SLECTING SUB DEPARTMENTS ON SELECTING A PARTICULAR DEPARTMENT
    const handleSelectAllSubDepartments = (department: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const subDepartments = departmentsData.find(dep => dep. department === department)?.sub_departments;
        if (subDepartments) {
            const allSelected = subDepartments.every(subDept => selected.includes(subDept));
            const newSelected = allSelected
                ? selected.filter(item => !subDepartments.includes(item))
                : [...selected, ...subDepartments];
            setSelected(newSelected);
        }
    };
  

    // TO RENDER THE SUB DEPARTMENT LIST
    const renderSubDepartments = (subDepartments: string[]) => {
        return subDepartments.map(subDept => (
            <ListItem key={subDept}>
                <FormControlLabel
                    control={<Checkbox checked={selected.includes(subDept)} onClick={() => handleCheckboxToggle(subDept)} />}
                    label={subDept.replace('_', ' ')}
                />
            </ListItem>
        ));
    };
  

    // TO RENDER THE DEPARTMENT LIST
    const renderDepartments = () => {
        return departmentsData.map(department => (
            <div key={department.department}>
                <ListItem sx={{ textDecoration: 'underline' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked = {
                                    selected.includes(department.department) ||
                                    department.sub_departments.every(subDept => selected.includes(subDept))
                                }
                                    indeterminate = {
                                    department.sub_departments.some(subDept => selected.includes(subDept)) &&
                                    !department.sub_departments.every(subDept => selected.includes(subDept))
                                }
                                onClick={(event) => {
                                    handleSelectAllSubDepartments(department.department, event);
                                }}
                            />
                        }
                        
                        label={department.department.replace('_', ' ')}
                    />
                    {
                        open.includes(department.department) ? 
                            <ExpandLess onClick={() => 
                                {
                                    handleToggle(department.department);
                                }} 
                            /> : 
                            <ExpandMore onClick={() => 
                                {
                                    handleToggle(department.department);
                                }}
                            />
                    }
                </ListItem>
                <Collapse in={open.includes(department.department)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            renderSubDepartments(department.sub_departments)
                        }
                    </List>
                </Collapse>
            </div>
        ));
    };
  
    return (
        <>
            <h2>Second Page Component 2</h2>
            {/* FINAL COMPLETE COMPONENT (BOTH DEPARTMENTS AND SUB DEPARTMENTS) RENDERING */}
            <List>
            {
                renderDepartments()
            }
            </List>
        </>
    );
};

export default SecondPageComponent2;