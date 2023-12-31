import React from 'react'
import { IButton } from './types';
import { Button as ButtonAntd } from 'antd';

/**
 * Renders a button component with the given properties.
 *
 * @param {string} label - The label text for the button.
 * @param {string} type - The type of button.
 * @param {string} styles - Additional styles for the button.
 * @param {function} onClick - The click event handler for the button.
 * @param {string} className - The class name for the button.
 * @param {object} props - Additional props for the button component.
 * @return {ReactElement} The rendered button component.
 */
export const ButtonField: React.FC<IButton> = ({ label, type, styles, onClick, className, ...props }) => {

   return (
      <ButtonAntd key={"bttn"+label} className={[className, styles].join(' ')} onClick={onClick} type={type} {...props} data-testid={'dataTestId-' + label}>
         {label}
      </ButtonAntd>
   )
}
