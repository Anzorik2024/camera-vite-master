import { useState, useEffect } from 'react';
import { selectPhone } from '../../store/order-slice/order-slice';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import PhoneValidationMessages from '../../const/phone-validation-messages';

interface PhoneNumberInputProps {
  setIsButtonDisabled: (isButtonDisabled: boolean) => void;
  isOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

function PhoneNumberInput({ inputRef, setIsButtonDisabled, isOpen} : PhoneNumberInputProps) :JSX.Element{
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputValue('');
    setError(null);
  }, [isOpen]);

  const normalizePhoneNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '');
    const normalizedDigits = digitsOnly.startsWith('8') ? `7${digitsOnly.slice(1)}` : digitsOnly;
    const withCountryCode = normalizedDigits.startsWith('7') ? `+${normalizedDigits}` : `+7${normalizedDigits}`;
    return withCountryCode.slice(0, 12);
  };

  const formatPhoneNumber = (value: string): string => {
    const normalizedValue = normalizePhoneNumber(value);
    if (normalizedValue.length <= 2) {
      return normalizedValue;
    }

    if (normalizedValue.length <= 5) {
      return `+7(${normalizedValue.slice(2)}`;
    }

    if (normalizedValue.length <= 8) {
      return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5)}`;
    }

    if (normalizedValue.length <= 10) {
      return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5, 8)}-${normalizedValue.slice(8)}`;
    }

    return `+7(${normalizedValue.slice(2, 5)})${normalizedValue.slice(5, 8)}-${normalizedValue.slice(8, 10)}-${normalizedValue.slice(10)}`; // +7(9XX)XXX-XX-XX
  };

  const validatePhoneNumber = (value: string): boolean => {
    const normalizedValue = normalizePhoneNumber(value);

    if (!normalizedValue || normalizedValue === '+7') {
      setError(PhoneValidationMessages.REQUIRED);
      return false;
    }

    const isValid = normalizedValue.length === 12;
    setError(isValid ? null : PhoneValidationMessages.LENGTH);
    return isValid;
  };

  const handleBlur = () => {
    if (error) {
      setInputValue('');
      setError(PhoneValidationMessages.REQUIRED);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (/[a-zA-Zа-яА-Я]/.test(rawValue)) {
      setError(PhoneValidationMessages.INVALID_CHARACTERS);
      return;
    }

    if (rawValue.length > 16) {
      setError(PhoneValidationMessages.EXCESSIVE_LENGTH);
      setIsButtonDisabled(false);
      return;
    }

    const formattedValue = formatPhoneNumber(rawValue);

    setInputValue(formattedValue);

    validatePhoneNumber(rawValue);

    const standardizedFormat = normalizePhoneNumber(rawValue);
    setIsButtonDisabled(validatePhoneNumber(rawValue));

    if(validatePhoneNumber(rawValue)) {
      dispatch(selectPhone(standardizedFormat));
    }
  };
  return (
    <div className={`custom-input form-review__item ${error ? 'is-invalid' : ''}`}>
      <label>
        <span className="custom-input__label">Телефон
          <svg width="9" height="9" aria-hidden="true">
            <use xlinkHref="#icon-snowflake"></use>
          </svg>
        </span>
        <input
          type="tel"
          name="user-tel"
          placeholder="Введите ваш номер +7(9XX)XXX-XX-XX"
          required
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="input-phone"
        />
      </label>
      {error && <p className="custom-input__error">{error}</p>}
    </div>

  );
}

export default PhoneNumberInput;
