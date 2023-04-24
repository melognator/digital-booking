import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MenuHeader from '../src/components/navbar/menu/MenuHeader'
import { Provider } from 'react-redux';


describe('render the default menu for mobile', () => {
    it('render menu header', () => {
        const menu = render(<MenuHeader></MenuHeader>)
        const p = screen.getByText("Menú")
        expect(p.textContent).toBe("Menú");
    })

    it('render menu header', () => {
        const menu = render(<MenuHeader></MenuHeader>)
        const button = screen.getByRole("heading", { level: 2 });
     expect(button.textContent).toBe("Menú");
    })

    it('render menu body', () => {
        const menu = render(<MenuHeader></MenuHeader>)
        const button = screen.getByRole("button", { name: "" });
     expect(button.textContent).toBe("");
    })


})

