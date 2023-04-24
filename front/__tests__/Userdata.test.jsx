import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, render, screen, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import UserData from '../src/components/bookingSections/UserData'


describe('render User arrive', () => {
    it('Arrive', () => {
        
        const menu = render(<UserData/>)
        // const title = screen.getByRole("heading", { level: 2 });
        // expect(title.textContent).toBe("");
      
    })
   
})