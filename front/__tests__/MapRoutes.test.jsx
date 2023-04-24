import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, render, screen, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom'
import MapRoutes from '../src/components/navbar/MapRoutes';
import { BrowserRouter } from 'react-router-dom';

describe('Nav bar buttons renders',() =>{
    it('Should render button crear cuenta', () =>{
        const component = render(<BrowserRouter><MapRoutes type='outlinedButton' /></BrowserRouter>)
        const button = screen.getByText('Crear cuenta') 
        expect(button.textContent).toBe('Crear cuenta')
    })

    it('Should render button', () =>{
        const component = render(<BrowserRouter><MapRoutes type='outlinedButton' /></BrowserRouter>)
        const button = screen.getByText('Iniciar sesión') 
        expect(button.textContent).toBe('Iniciar sesión')
    })

    it('Should click button', () =>{
        const component = render(<BrowserRouter><MapRoutes type='outlinedButton' /></BrowserRouter>)
        const button = screen.getByText('Crear cuenta') 
        expect(button.textContent).toBe('Crear cuenta')
        fireEvent.click(button)
        expect(window.location.href).toBe('http://localhost:3000/register')
    })

    it('Should render menu button', () =>{
        const component = render(<BrowserRouter><MapRoutes type='menuButton' /></BrowserRouter>)
        const button = screen.getByText('Iniciar sesión') 
        expect(button.textContent).toBe('Iniciar sesión')
    })

    it('Should render close x button', () =>{
        const component = render(<BrowserRouter><MapRoutes type='menuButton' /></BrowserRouter>)
        // const button = getByRole("button")
        // expect(button).toBeInTheDocument
    })
})

