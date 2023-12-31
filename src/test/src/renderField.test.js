import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { renderfields } from '../../utils/renderField'; // Atualize com o caminho correto
import { setMatchMediaMock } from '../mock/matchMedia';

import { renderOptionsApiName } from '../mock/renderField';

setMatchMediaMock();

// Mocks para as funções e propriedades necessárias
const mockSetFieldValues = jest.fn();
const formInstance = { getFieldValue: jest.fn() };

const validfields = (fieldData, testId) => {
  const { getByTestId } = render( <div> {renderfields(fieldData, 0, formInstance, mockSetFieldValues)} </div> );
  const field = getByTestId(testId);
  expect(field).toBeInTheDocument();
}

// Exemplo de teste para o campo select
describe('renderfields function', () => {
  it('renders input fields correctly', async () => {
    const field1 = { label: 'common.name', name: 'Name', rules: [{ required: true, message:"common.required.field" }] }
    const field2 = { label: 'common.test', name: 'Test', rules: [{ required: true, message:"common.required.field" }] }
    const fields = [field1, field2]
    const { getByTestId } = render( <div> {fields.map((field) => renderfields(field, 0, formInstance, mockSetFieldValues))} </div> );
    const inputField1 = getByTestId(`dataTestId${field1.name}`);
    expect(inputField1).toBeInTheDocument();
    const inputField2 = getByTestId(`dataTestId${field2.name}`);
    expect(inputField2).toBeInTheDocument();
    fireEvent.change(inputField1, { target: { value: "1" } });
    expect(inputField1.value).toBe("1");
    fireEvent.change(inputField2, { target: { value: "2" } });
    expect(inputField2.value).toBe("2");
  });

  it('renders inputs doublelines fields correctly', async () => {
    const fields = [
      { label: 'ID', name: 'ID', type: 'hidden' },
      { name: "doublelines",
        doublelines: [
          { label: 'common.name', name: 'ApiID', type: 'select', optionsFunction: renderOptionsApiName },
          { label: 'common.key', name: 'ApiKey' },
        ]
      },
    ];
    const { getByTestId } = render( <div> {fields.map((field) => renderfields(field, 0, formInstance, mockSetFieldValues))} </div> );
    const inputField1 = getByTestId(`dataTestIdApiID`);
    expect(inputField1).toBeInTheDocument();
    const inputField2 = getByTestId(`dataTestIdApiKey`);
    expect(inputField2).toBeInTheDocument();
  });

  it('renders select fields correctly', async () => {
    const field = { label: 'common.select', type: 'select', name: 'select', rules: [{ required: true, message:"common.required.field" }] }
    validfields(field, `dataTestId${field.name}`);
  });

  it('renders datePicker fields correctly', async () => {
    const field = { label: 'common.datePicker', type: 'datePicker', name: 'datePicker', rules: [{ required: true, message:"common.required.field" }] }
    validfields(field, `dataTestId-${field.name}`);
  });

  it('renders slider fields correctly', async () => {
    const field = { label: 'common.slider', type: 'slider', name: 'slider', rules: [{ required: true, message:"common.required.field" }] }
    validfields(field, `dataTestId${field.name}`);
  });

  it('renders number fields correctly', async () => {
    const field = { label: 'common.number', type: 'number', name: 'number', required: true }
    validfields(field, `dataTestId${field.name}`);
    fireEvent.change(screen.getByTestId(`dataTestId${field.name}`), { target: { value: "11" } });
    expect(screen.getByTestId(`dataTestId${field.name}`).value).toBe("11");
  });

});
