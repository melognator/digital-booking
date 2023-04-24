import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, render, screen, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import Categories from '../src/components/category/Categories'


describe('render User arrive', () => {
    it('Arrive', () => {
        
        const categories = render(<Categories/>)
        // const title = screen.getByRole("heading", { level: 2 });
        // expect(title.textContent).toBe("");
      
    })
   
})