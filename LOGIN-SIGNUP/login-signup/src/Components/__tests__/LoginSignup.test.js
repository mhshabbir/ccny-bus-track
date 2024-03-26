import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { LoginSignup } from '../LoginSignup/LoginSignup';

describe('LoginSignup Component', () => {
    afterEach(cleanup);

    test('Name input should not be present when action is set to Login', async () => {
        render(<LoginSignup />);
        
        // let nameInput = screen.queryByPlaceholderText('Name');
        // expect(nameInput).toBeInTheDocument();

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        let nameInput2 = screen.queryByPlaceholderText('Name');
        expect(nameInput2).not.toBeInTheDocument();
    });

    test('toggles form state between Login and Sign Up', () => {
        render(<LoginSignup />);
        const signUpButton = screen.getByText('Sign Up');
        const loginButton = screen.getByText('Login');
        
        expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
        
        fireEvent.click(loginButton);
        expect(screen.queryByPlaceholderText('Name')).not.toBeInTheDocument();
        
        fireEvent.click(signUpButton);
        expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
    });


    test('Email and Password input fields are present in both Login and Sign Up forms', () => {
        render(<LoginSignup />);
        
        expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        
        fireEvent.click(screen.getByText('Login'));
        expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
});

describe('LoginSignup Form Submission', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log');
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('logs form data to console on successful submission', () => {
        render(<LoginSignup />);
        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test Name' } });
        fireEvent.change(screen.getByPlaceholderText('Email ID'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        
        expect(consoleSpy).toHaveBeenCalledWith('Submitting form data:', {name: 'Test Name', email: 'test@example.com', password: 'password123'});
    });

    test('logs an error for invalid email format upon submission', () => {
        render(<LoginSignup action="Sign Up"/>);
        fireEvent.change(screen.getByPlaceholderText('Email ID'), { target: { value: 'invalid' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(consoleSpy).toHaveBeenCalledWith('Form has errors.');
    });

    test('logs an error for password less than 8 characters upon submission', () => {
        render(<LoginSignup action="Sign Up"/>);

        fireEvent.change(screen.getByPlaceholderText('Email ID'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });

        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(consoleSpy).toHaveBeenCalledWith('Form has errors.');
    });
});