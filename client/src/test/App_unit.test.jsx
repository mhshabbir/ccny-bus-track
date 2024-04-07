// Contents of App.unit.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; // Adjust the path as needed

describe('App Component', () => {
  test('initially hides borough buttons and displays only the log in button', () => {
    render(<App />);
    expect(screen.queryByText('125 Street')).toBeNull();
    expect(screen.queryByText('145 Street')).toBeNull();
    expect(screen.getByText('Student')).toBeInTheDocument();
    // expect(screen.getByText('Bus Driver')).toBeInTheDocument();
  });

  test('displays the correct message when 125 Street button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Student'))
    fireEvent.click(screen.getByText('125 Street'));
    expect(screen.getByRole('heading')).toHaveTextContent('You are at 125 Street')
  });
  
  test('displays the correct message when 125 Street button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Student'))
    fireEvent.click(screen.getByText('125 Street'));
    expect(screen.getByRole('heading')).toHaveTextContent('You are at 125 Street')
  });

  test('displays the correct message when 145 Street button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Student'))
    fireEvent.click(screen.getByText('145 Street'));
    expect(screen.getByRole('heading')).toHaveTextContent('You are at 145 Street')
  });

});