import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, render, screen, logRoles } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import Details from '../src/components/bookingSections/Details';
import { normalizeRating, toString } from '../src/utils/normalizations';
import { DetailDate, FormTitle } from '../src/components/bookingSections/BookingSectionStyles';


describe('render the default menu for mobile', () => {
    it('render menu header', () => {
        const product = {
            images: [{url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fgroups%2F1564059490519561%2F&psig=AOvVaw28uh8W7rGVyZtFi3peSy3u&ust=1679679696754000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjr8M_M8v0CFQAAAAAdAAAAABAE", title: "990", globalRating: 1 }]
        }

        const menu = render(<FormTitle/>)

        const title = screen.getByRole("heading", { level: 2 });
        expect(title.textContent).toBe("");
      
    })

    it('Render retirement date ', () => {
        const dateR = render(<DetailDate/>)
        const title = screen.findAllByText("Retiro");
        expect(title.toBe);
    })

   
})
