import { describe, expect, test } from 'vitest';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { Coords125, CoordsCCNY, Coords145 } from './Coordinates'; // Adjust the path as needed

describe('App Component', () => {
  test('displays 125th street bus coordinates when Brooklyn button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Student"))
    fireEvent.click(screen.getByText('125 Street'))
    await waitFor(() => {
      expect(screen.getByTestId('coordinates')).toHaveTextContent(`Latitude: ${Coords125.lat}, Longitude: ${Coords125.lng}`);
    });
  });
  
  test('displays CCNY bus coordinates when CCNY button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Student"))
    fireEvent.click(screen.getByText('CCNY'))
    await waitFor(() => {
      expect(screen.getByTestId('coordinates')).toHaveTextContent(`Latitude: ${CoordsCCNY.lat}, Longitude: ${CoordsCCNY.lng}`);
    });
  });

  test('displays 145th street bus coordinates when Manhattan button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Student"))
    fireEvent.click(screen.getByText('145 Street'))
    await waitFor(() => {
      expect(screen.getByTestId('coordinates')).toHaveTextContent(`Latitude: ${Coords145.lat}, Longitude: ${Coords145.lng}`);
    });
  });
});