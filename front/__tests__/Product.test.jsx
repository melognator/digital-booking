import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import ProductDescription from '../src/components/productSections/ProductDescription';
import ProductFeatures from '../src/components/productSections/ProductFeatures';
import ProductBooking from '../src/components/productSections/ProductBooking';
import ProductInfo from '../src/components/productSections/ProductInfo';
import ProductPolicy from '../src/components/productSections/ProductPolicy';
import ProductTitle from '../src/components/productSections/ProductTitle';
import '@testing-library/jest-dom'
import ProductLocation from '../src/components/productSections/ProductLocation';

describe('Render prodruct', () => {
  it('renders description', () => {
    const {getByRole} = render(<ProductDescription  descriptionTitle="Conduce el auto de tus sueños" description="toyota prius 4 puertas" />);
    const h2 = getByRole("heading", { level: 2 })
    expect(h2.textContent).toBe("Conduce el auto de tus sueños");
    screen.debug();
  });

  it('renders features', () => {
    const {getByRole} = render(<ProductFeatures features={[]} />);
    const h2 = getByRole("heading", { level: 2 })
    expect(h2.textContent).toBe("¿Qué ofrece este vehículo?");
    screen.debug();
  });

  it('renders booking', () => {
    const {getByRole} = render(<BrowserRouter><ProductBooking /></BrowserRouter>);
    const h2 = getByRole("heading", { level: 2 })
    expect(h2.textContent).toBe("Fechas disponibles");
    screen.debug();
  });

  it('renders product info', () => {
    const {getByRole} = render(<ProductInfo city={{country: 'Colombia', region: 'Antioquia', cityName: 'medellin'}} rating = '5' />);
    const h2 = getByRole("heading", { level: 4 })
    expect(h2.textContent).toBe("Colombia, Antioquia, medellin");
    screen.debug();
  });

  it('renders product policy', () => {
    const {getByRole} = render(<ProductPolicy policy={[]} />);
    const h2 = getByRole("heading", { level: 2 })
    expect(h2.textContent).toBe("Que tenés que saber");
    screen.debug();
  });

  it('renders product title', () => {
    const {getByRole} = render(<BrowserRouter><ProductTitle title='Hola mundo' category='lujo' /></BrowserRouter>);
    const h2 = getByRole("heading", { level: 4 })
    expect(h2.textContent).toBe("lujo");
    screen.debug();
  });

  it('renders product title', () => {
    const {getByRole} = render(<ProductLocation location='Bogota' mapImage=''/>);
    const h2 = getByRole("heading", { level: 2 })
    expect(h2.textContent).toBe("¿Dónde recoger el vehículo?");
    screen.debug();
  });


});