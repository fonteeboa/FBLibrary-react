import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Button} from '../../components';
import { buttonProps, onClickMock } from '../mock/button';

describe('Button', () => {
  it('Renderiza o componente Button corretamente', () => {
    const { getByText } = render(<Button {...buttonProps} />);
    // Verifique se o componente Button foi renderizado com os valores corretos
    expect(getByText('Click me')).toBeInTheDocument();
  
    // Simule um clique no botão e verifique se o manipulador de clique é chamado
    fireEvent.click(getByText('Click me'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
})
