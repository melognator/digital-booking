import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, render, screen, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import UserDates from '../src/components/bookingSections/UserDates'


describe('render User arrive', () => {
    it('Arrive', () => {
        
        const dates = render(<UserDates/>)
        // const title = screen.getByRole("heading", { level: 2 });
        // expect(title.textContent).toBe("");
      
    })
   
})