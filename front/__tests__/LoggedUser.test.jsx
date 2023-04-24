import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoggedUser from '../src/components/navbar/LoggedUser';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';

describe('Render icon of a logged user', () => {
    it('render of initials', () => {
        // const button = render(<Provider><LoggedUser /></Provider>)
        // const h2 = getByRole("heading", { level: 4 })
        // const p = screen.getByText(/FC/)
        // expect(h2.textContent).toBe("Hola,");
        // expect(p.textContent).toBe("FC");
        // screen.debug();
    })
})