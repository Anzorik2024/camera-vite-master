import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';

describe('Footer Component', () => {
  it('renders the logo with correct attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logo = screen.getByTestId('link');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('aria-label', 'Переход на главную');
    expect(logo).toHaveAttribute('title', 'На главную');
  });

  it('displays the footer description correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const description = screen.getByText(/Интернет-магазин фото- и видеотехники/i);
    expect(description).toBeInTheDocument();
  });

  it('displays navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const navigationTitle = screen.getByText(/Навигация/i);
    const resourcesTitle = screen.getByText(/Ресурсы/i);
    const supportTitle = screen.getByText(/Поддержка/i);

    expect(navigationTitle).toBeInTheDocument();
    expect(resourcesTitle).toBeInTheDocument();
    expect(supportTitle).toBeInTheDocument();

    const catalogLink = screen.getByText(/Каталог/i);
    const guaranteesLink = screen.getByText(/Гарантии/i);
    const deliveryLink = screen.getByText(/Доставка/i);
    const aboutLink = screen.getByText(/О компании/i);

    expect(catalogLink).toBeInTheDocument();
    expect(guaranteesLink).toBeInTheDocument();
    expect(deliveryLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    const coursesLink = screen.getByText(/Курсы операторов/i);
    const blogLink = screen.getByText(/Блог/i);
    const communityLink = screen.getByText(/Сообщество/i);

    expect(coursesLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
    expect(communityLink).toBeInTheDocument();

    const faqLink = screen.getByText(/FAQ/i);
    const askQuestionLink = screen.getByText(/Задать вопрос/i);

    expect(faqLink).toBeInTheDocument();
    expect(askQuestionLink).toBeInTheDocument();
  });
});
